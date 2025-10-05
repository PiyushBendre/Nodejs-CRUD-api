# Node.js CRUD API with Microsoft SQL Server

A simple and robust CRUD (Create, Read, Update, Delete) API built with Node.js, Express.js, and Microsoft SQL Server.

## Features

- ✅ Complete CRUD operations for Users
- ✅ Microsoft SQL Server integration
- ✅ Input validation with Joi
- ✅ Error handling and proper HTTP status codes
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Environment-based configuration
- ✅ Clean and modular code structure
- ✅ Request logging
- ✅ Graceful shutdown handling

## Project Structure

```
nodejs-crud-api/
├── config/
│   └── database.js          # Database configuration and connection
├── controllers/
│   └── userController.js    # User business logic
├── middleware/
│   └── validation.js        # Input validation middleware
├── models/
│   └── User.js              # User data model
├── routes/
│   └── userRoutes.js        # API routes
├── app.js                   # Express application setup
├── package.json             # Dependencies and scripts
├── config.env               # Environment variables
└── README.md                # This file
```

## Prerequisites

- Node.js (v14 or higher)
- Microsoft SQL Server (2016 or higher)
- npm or yarn

## Installation

1. **Clone or download the project**
   ```bash
   cd nodejs-crud-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `config.env` and update the database configuration:
   ```env
   # Database Configuration
   DB_SERVER=localhost
   DB_DATABASE=crud_api_db
   DB_USER=sa
   DB_PASSWORD=your_password_here
   DB_PORT=1433
   DB_ENCRYPT=true
   DB_TRUST_SERVER_CERTIFICATE=true

   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

4. **Set up the database**
   
   Create a database named `crud_api_db` in your SQL Server instance. The application will automatically create the `users` table on first run.

5. **Start the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### User Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/v1/users` | Create a new user | `{ "name": "string", "email": "string" }` |
| GET | `/api/v1/users` | Get all users | - |
| GET | `/api/v1/users/:id` | Get user by ID | - |
| PUT | `/api/v1/users/:id` | Update user by ID | `{ "name": "string", "email": "string" }` |
| DELETE | `/api/v1/users/:id` | Delete user by ID | - |

### Other Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information and available endpoints |
| GET | `/health` | Health check endpoint |

## API Examples

### Create a User
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com"
  }'
```

### Get All Users
```bash
curl http://localhost:3000/api/v1/users
```

### Get User by ID
```bash
curl http://localhost:3000/api/v1/users/1
```

### Update User
```bash
curl -X PUT http://localhost:3000/api/v1/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/v1/users/1
```

## Response Format

All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "count": 1  // Only for list operations
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "errors": [  // Only for validation errors
    {
      "field": "fieldName",
      "message": "Error message"
    }
  ]
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE()
);
```

## Validation Rules

### User Creation/Update
- **name**: Required, 2-255 characters
- **email**: Required, valid email format, 2-255 characters, unique

### ID Parameter
- Must be a positive integer

## Error Handling

The API includes comprehensive error handling for:

- **400 Bad Request**: Invalid input data or validation errors
- **404 Not Found**: Resource not found
- **409 Conflict**: Duplicate email addresses
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server-side errors

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: Parameterized queries

## Development

### Scripts
- `npm start`: Start the application in production mode
- `npm run dev`: Start the application in development mode with auto-restart
- `npm test`: Run tests (placeholder)

### Environment Variables
All configuration is managed through environment variables in `config.env`:

- `DB_SERVER`: SQL Server hostname
- `DB_DATABASE`: Database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_PORT`: Database port (default: 1433)
- `DB_ENCRYPT`: Enable encryption (default: true)
- `DB_TRUST_SERVER_CERTIFICATE`: Trust server certificate (default: true)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Testing

You can test the API using:

1. **cURL** (examples provided above)
2. **Postman** - Import the endpoints
3. **Thunder Client** (VS Code extension)
4. **Any HTTP client**

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify SQL Server is running
   - Check connection credentials in `config.env`
   - Ensure the database exists

2. **Port Already in Use**
   - Change the `PORT` in `config.env`
   - Or kill the process using the port

3. **Validation Errors**
   - Check request body format
   - Ensure required fields are provided
   - Verify email format

