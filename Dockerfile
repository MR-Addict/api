FROM amazon/aws-lambda-nodejs:14
WORKDIR /app
COPY . ${LAMBDA_TASK_ROOT}
RUN npm install -ci
RUN npm run build
CMD ["npm", "start"]