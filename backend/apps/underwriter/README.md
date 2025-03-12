# Underwriter Service

This is a demo underwriter service that processes insurance claims and determines underwriting decisions based on predefined logic. It simulates a real-world underwriting process by evaluating claims and sending status updates via webhooks.

## Features
- **Claim Processing:** Accepts claims and schedules underwriting decisions.
- **Automated Evaluation:** Determines claim approval or rejection based on policy number.
- **Webhook Integration:** Sends underwriting results to a configured webhook URL.
- **Swagger API Documentation:** Provides an interactive API for testing.

## Installation

```sh
npm install
```

## Running the Application

```sh
# Development
npm run start

# Watch mode (hot reload)
npm run start:dev

# Production
npm run start:prod
```

## API Documentation
Swagger documentation is available at:
```
http://localhost:4001/api
```

## Environment Variables
Configure your `.env` file with the required values:

```sh
PORT=4001
WEBHOOK_URL=http://your-webhook-endpoint.com
```

## Deployment
To deploy the underwriter service, follow **NestJS deployment best practices**.

## License
This project is **MIT Licensed**.
