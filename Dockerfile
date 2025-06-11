FROM node:20-slim

WORKDIR /app
COPY dist/front-ecommerce/browser /app

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", ".", "-l", "8080"]

