FROM nginx:alpine
# Serve .mjs as JavaScript; browsers refuse to run module scripts sent as octet-stream.
RUN sed -i -E 's/^([[:space:]]*(application|text)\/javascript[[:space:]]+js);/\1 mjs;/' /etc/nginx/mime.types \
    && grep -Eq '/javascript[[:space:]]+js mjs;' /etc/nginx/mime.types
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
RUN rm /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/nginx.conf
EXPOSE 80
