# Claims API

A NestJS-based insurance claims API integrated with third-party underwriters using secure HMAC authentication. Claim updates are received in real time via webhooks, and the accompanying Preact + Vite-based admin portal UI displays live claim status changes via WebSockets.

## Features

- Submit New Claims
- Retrieve Claims
- Update Claims
- Upload Supporting Documents to Cloudinary
- Real-time Updates via WebSockets
- Secure Integration with Underwriters (using HMAC)
- Swagger API Documentation
- MongoDB Integration
- Underwriter App – Showcasing external third-party API integration

## Project Structure

```
claims-api/
├── backend/
│   └── apps/
│       ├── claims/
│       │   ├── src/
│       │   ├── package.json
│       │   └── .env.example
│       ├── underwriter/
│       │   ├── src/
│       │   ├── package.json
│       │   └── .env.example
├── frontend/ (Preact + Vite)
│   ├── src/
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
└── README.md
```

## Environment Variables

Copy the `.env.example` files in each sub-project to `.env` and update the values.

Example for backend (backend/apps/claims/.env):

```sh
MONGO_URI=mongodb://mongo:27017/claims-api
AUTH_SECRET=your-jwt-secret
AUTH_EXPIRES_IN=5m
PORT=3000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Example for frontend (frontend/.env):

```sh
VITE_API_URL=http://localhost:3000/api
```

Example for underwriter app (backend/apps/underwriter/.env):

```sh
UNDERWRITER_API_KEY=your-api-key
UNDERWRITER_SECRET=your-secret-key
```

## Running the Application

### Recommended: Using Docker Compose

```sh
docker-compose up --build
```

### Without Docker

#### Backend

```sh
cd backend/apps/claims && npm install && npm run start:dev
```

```sh
cd backend/apps/underwriter && npm install && npm run start:dev
```

#### Frontend (Preact + Vite)

```sh
cd frontend && npm install && npm run dev
```

## API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api
```

### Using Swagger Authentication

Open Swagger UI, click "Authorize", enter the token as: `Bearer your.jwt.token`, and click "Authorize".

## Underwriter App Integration

The **Underwriter App** is designed to showcase external third-party API integration. The **Claims API** submits claims to the **Underwriter App**, which then assesses the claim and sends updates via webhooks using **HMAC authentication**. The Claims API processes these updates and notifies the admin UI in real-time via WebSockets.

### Workflow
1. **Claim Submission:** Claims API receives a new claim.
2. **Claims API Calls Underwriter:** The Claims API sends the claim to the Underwriter API using HMAC authentication.
3. **Underwriter Processes Claim:** The Underwriter API evaluates the claim and determines a status (APPROVED, REJECTED, PENDING).
4. **Underwriter Sends Webhook Update:** The Underwriter API triggers a webhook request to the Claims API to notify it of the claim decision.
5. **Claims API Updates Claim:** The Claims API updates the claim status in the database and logs the response.
6. **Real-time Updates to Admin UI:** The Claims API broadcasts a WebSocket event so the admin UI receives the status update instantly.

## Uploading Documents to Cloudinary

Set up a Cloudinary account and update the backend `.env` file with your credentials. Use the `POST /uploads/documents` endpoint with multipart/form-data to upload files. Retrieve document URLs via `GET /claims/:id`.

## Running Tests

#### Backend Tests

```sh
cd backend/apps/claims && npm run test
```

```sh
cd backend/apps/underwriter && npm run test
```

#### Frontend Tests

```sh
cd frontend && npm run test
```

## Deployment

Use standard NestJS deployment guidelines for the backend and your preferred process for the frontend. For Docker deployments, use the provided `docker-compose.yml`.

## License

MIT Licensed

