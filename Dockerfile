FROM node:alpine as build

WORKDIR /app
COPY . /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY nginx/default.conf.template /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/public /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]