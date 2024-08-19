# Innoscripta Study Case

Hello! This is my solution to the Innoscripta Study Case. I hope you enjoy it!

## How to run

- Make sure you have docker installed.
- Run `docker-compose up` in the root directory of this project. The server will be running on `localhost:3000`.
- If dont want to use docker, you can run `npm install` and `npm run dev` in the root directory of this project. Make sure you have node installed.

## Observations

- The New York Times API doesnt support filter by author and section at the same time, if you do that, the code will prioritize the author filter.
- The New York Times API only support 5 requests per minute, so if you make more than 5 requests in a minute, the server will return a 429 status code.
- The Guardian and News.org doesn't support multiple categories, so you can only filter by one category at a time.
- News.org doesnt support search by author, so the author filter will be ignored if you use it.
