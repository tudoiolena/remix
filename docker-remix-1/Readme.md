1. Start all containers with `make up`
2. Start remix container separately with access to comand line `make run`
3. Inside of remix container run commands:

- `npm i`
- `npm run prisma:migrate:dev`
- `npm run prisma:seed`
- `npm run dev`
