FROM node:20.15.0

WORKDIR /usr/app

COPY package*.json ./
COPY .env ./
RUN yarn install --frozen-lockfile

# Install Nest CLI globally
RUN yarn global add @nestjs/cli

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 3000

CMD ["yarn", "start"]