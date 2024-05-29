#Stage 1
FROM node:latest AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

#Stage 2

FROM base AS build
RUN npm run build

#Stage 3
FROM base AS development
WORKDIR /app
ENV PORT=3000
EXPOSE $PORT
CMD ["npm", "run", "dev"]


FROM nginx:latest as production
WORKDIR /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/*
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html/dist
COPY --from=base /app/nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]




