# Claims API

A **NestJS-based** insurance claims API for managing claim submissions, retrieval, and updates.

## Features
- **Submit new claims**
- **Retrieve all claims**
- **Get claim details by ID**
- **Update claim status**
- **Swagger API documentation**
- **MongoDB integration**

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
http://localhost:3000/api
```

### Using Swagger Authentication
1. Open the Swagger UI at `http://localhost:3000/api`.
2. Click on the "Authorize" button.
3. Enter the **Bearer token** obtained from the `/auth/login` endpoint in the format:
   ```
   Bearer your.jwt.token
   ```
4. Click "Authorize" to use authenticated requests in Swagger.

Now, you can test protected endpoints directly from the Swagger UI.

## Running Tests

```sh
# Unit tests
npm run test

# Test coverage
npm run test:cov
```

## Environment Variables

Configure your `.env` file with the required values:

```sh
MONGO_URI=mongodb://localhost:27017/your-database-name
AUTH_SECRET=your-jwt-secret
AUTH_EXPIRES_IN=1d
AUTH_USERNAME=username
AUTH_PASSWORD=password
PORT=3000
```

## Deployment
To deploy the API, follow standard **NestJS deployment guidelines**:  
[NestJS Deployment Guide](https://docs.nestjs.com/deployment)

## License
This project is **MIT Licensed**.
