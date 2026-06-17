# Local Setup Guide

I have already performed the following steps for you:
1.  Installed all dependencies (`pnpm install`).
2.  Fixed TypeScript errors in the `portfolio` package.
3.  Generated API client code from the OpenAPI spec.
4.  Verified that both the API server and the Portfolio can build.

## Running the Project

To run the project locally, you need to set some environment variables. I recommend creating a `.env` file in the root (though you'll need to pass them manually or use a tool like `dotenv-cli` since the project doesn't load them automatically).

### 1. Database
You need a PostgreSQL database. Set the connection string in your environment:
`DATABASE_URL=postgres://user:password@localhost:5432/db_name`

Then, sync the schema:
```bash
$env:DATABASE_URL="your_url"; pnpm --filter @workspace/db run push
```

### 2. API Server
```bash
$env:PORT="5000"; $env:DATABASE_URL="your_url"; pnpm --filter @workspace/api-server run dev
```

### 3. Portfolio (Frontend)
```bash
$env:PORT="3000"; $env:BASE_PATH="/"; pnpm --filter @workspace/portfolio run dev
```

### 4. Mockup Sandbox (Optional)
```bash
$env:PORT="3001"; $env:BASE_PATH="/"; pnpm --filter @workspace/mockup-sandbox run dev
```

## Summary of Environment Variables
| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | Postgres Connection String | `postgres://localhost:5432/mydb` |
| `PORT` | Port for the application | `3000` |
| `BASE_PATH` | Base URL path for Vite | `/` |
