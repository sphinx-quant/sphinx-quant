# 构建前端页面
FROM node:alpine as builder 
WORKDIR /app
COPY ./frontend .
RUN npm install
RUN npm run build

# 打包前端工程
FROM nginx:alpine
WORKDIR /www/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist .
