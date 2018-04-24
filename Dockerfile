FROM node:carbon

WORKDIR /usr/src/app
COPY . .
RUN npm install

VOLUME /usr/src/app/logs
EXPOSE 3000

CMD ["npm", "start"]


