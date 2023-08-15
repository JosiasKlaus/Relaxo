FROM node:lts as build
WORKDIR /app

# Add and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Add and build app
ADD . /app
RUN npm run build

FROM nginx:latest
LABEL maintainer="Josias Klaus <josias.klaus@web.de>"

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]