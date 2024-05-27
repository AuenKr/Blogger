To run locally

1. rename all sample.env to .env file and  sample.wrangler.toml to wrangler.toml and configure all the values

2. Connect your prisma accelerate and put connection pooling string in backend.env

#### Note 
Using running postgres locally will not work must need to do above two steps.

3a. With Docker

    - In Linux
    > docker compose up

    - In Windows
    > docker-compose up

3b. Without Docker
> Install node

> For Backend
    Go to backend and run `npm install` and then `npm run dev`

> For Frontend
    Go to frontend and run `npm install` and then `npm run dev`
