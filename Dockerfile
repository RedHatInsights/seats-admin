FROM registry.access.redhat.com/ubi9/nodejs-18 as builder
USER root
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM registry.access.redhat.com/ubi9/nginx-120 as production
ENV NODE_ENV production
COPY --from=builder /app/apps/standalone/dist /opt/app-root/src/
EXPOSE 8080
USER 1001
CMD ["nginx", "-g", "daemon off;"]