FROM node:16.1

RUN mkdir /app
RUN groupadd -r front
RUN useradd -r -s /bin/false -g front front

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

RUN chown -R front:front /app
USER front

ENTRYPOINT ["npm", "start"]

