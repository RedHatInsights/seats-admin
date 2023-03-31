FROM --platform=linux/amd64 node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build --workspace=standalone

FROM --platform=linux/amd64 nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/apps/standalone/dist /usr/share/nginx/html
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
