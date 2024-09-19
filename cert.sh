docker run -it --rm --name certbot \
  -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
  -v "$(pwd)/certbot/www:/var/www/certbot" \
  certbot/certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --register-unsafely-without-email \
  --agree-tos \
  --no-eff-email \
  -d api.harislearn.com