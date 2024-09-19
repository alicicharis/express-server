REQUESTS=1000

# Loop to send multiple curl requests
for ((i=1; i<=REQUESTS; i++)); do
  echo "Sending request #$i"
  curl -s http://localhost
  echo -e "\n"
done