# Claims API

A **NestJS-based** insurance claims API for managing claim submissions, retrieval, and updates.

## Features

- **Submit new claims**
- **Retrieve all claims**
- **Get claim details by ID**
- **Update claim status**
- **Upload supporting documents to Cloudinary**
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

## Uploading Documents to Cloudinary

The API supports uploading claim-related documents (PDFs, images) to **Cloudinary**.

### Steps to Upload Documents

1. **Set up Cloudinary**

   - Create an account at [Cloudinary](https://cloudinary.com/).
   - Get your **Cloud Name, API Key, and API Secret** from the Cloudinary dashboard.

2. **Configure Environment Variables** Add the following to your `.env` file:

   ```sh
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

3. **Upload a Document**

   - Use the `POST /uploads/documents` endpoint.
   - Attach files using the `multipart/form-data` format.
   - The API will store the uploaded document on Cloudinary and return a **secure URL**.

4. **Retrieve Uploaded Documents**

   - Each claim will store a reference to the uploaded document URLs.
   - Use `GET /claims/:id` to view associated documents.

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

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Deployment

To deploy the API, follow standard **NestJS deployment guidelines**:\
[NestJS Deployment Guide](https://docs.nestjs.com/deployment)

## License

This project is **MIT Licensed**.

