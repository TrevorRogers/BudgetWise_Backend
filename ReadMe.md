# Budgetwise API

## Local setup

- create `.env.development` with `PGDATABASE='budgetwise'`
- `npm run setup-dbs` to create the dbs
- `npm run seed` to seed the data
- `npm start` to spin up the server
- navigate to http://localhost:9090/api to check it's running

### GET endpoints currently available:

- `/api/categories` (All categories)
- `/api/overview` (Home page data)
- `/api/budget` (Budget page data)
- `/api/goals` (Goals page)
- `/api/recurring_transactions` (Recurring payments data)
