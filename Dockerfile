FROM node:slim

RUN mkdir -p /home/drungor
WORKDIR /home/drungor

COPY . /home/drungor

RUN yarn install --production
RUN npm run build
ENTRYPOINT ["npm", "run", "start"]
