FROM node:lts as build
ARG VITE_BACKEND_URL
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
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
