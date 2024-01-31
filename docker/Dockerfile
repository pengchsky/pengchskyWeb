FROM harbor.mixiu168.com:8888/mixiu/nginx:1.13.12-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html/
# 使用自定义nginx.conf配置端口和监听
RUN rm /etc/nginx/conf.d/default.conf
ADD ./docker/default.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
