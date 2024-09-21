reload_caddy() {
  docker exec caddy caddy reload --config /etc/caddy/Caddyfile
}

deploy() {
  service_name=express-server
  docker compose up -d --build
}

zero_downtime_deploy() {  
  service_name=express-server
  old_container_id=$(docker ps -f name=$service_name -q | tail -n1)

  if [ -z "$old_container_id" ]; then
  echo "Docker compose up"
  deploy
  return;
  fi

  # bring a new container online, running new code  
  echo "Bringing a new container online"
  docker compose up -d --no-deps --scale $service_name=2 --no-recreate $service_name --build

  CONTAINERS=$(docker compose ps -q $service_name)
  CONTAINER_1=$(echo $CONTAINERS | cut -d' ' -f1)
  CONTAINER_2=$(echo $CONTAINERS | cut -d' ' -f2)

  echo "Container 1" . $CONTAINER_1
  echo "Container 2" . $CONTAINER_2

  echo "Waiting for the second container to be healthy..."

# Wait for the second container to be healthy
  while true; do
      # Check if the container is running
      STATUS=$(docker inspect --format='{{.State.Status}}' $CONTAINER_2)
      if [ "$STATUS" = "running" ]; then
          # If it's running, check if it has a health check
          if docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' $CONTAINER_2 | grep -q 'none'; then
              echo "Container is running and has no health check. Assuming it's ready."
              break
          else
              # If it has a health check, wait for it to be healthy
              echo "Else for health check: " $CONTAINER_2
              HEALTH=$(docker inspect --format='{{.State.Health.Status}}' $CONTAINER_2)
              if [ "$HEALTH" = "healthy" ]; then
                  echo "Container is running and healthy."
                  break
              fi
          fi
      fi
      echo "Waiting for container to be ready..."
      sleep 3
  done
  echo "New container is available"
  # start routing requests to the new container (as well as the old)  
  # reload_nginx
  reload_caddy

  echo "Routing requests to the new container"
  # take the old container offline  
  docker stop $old_container_id
  docker rm $old_container_id

  echo "Taking the old container offline"
  docker compose up -d --no-deps --scale $service_name=1 --no-recreate $service_name

  echo "Taking the old container offline"
  # stop routing requests to the old container  
  # reload_nginx  
  reload_caddy
}

zero_downtime_deploy