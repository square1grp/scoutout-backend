FROM node

ARG NODE_ENV
ARG PGHOST
ARG PGDATABASE
ARG PGUSERNAME
ARG PGPASSWORD
ARG PGPORT

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "nodemon", "app.js" ]