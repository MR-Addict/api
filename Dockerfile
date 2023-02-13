FROM node:14.21.2-slim
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm","run","start"]