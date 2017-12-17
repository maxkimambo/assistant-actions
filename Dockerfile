FROM node:9.3-alpine

ADD . / 
RUN npm install --silent 
CMD npm start 