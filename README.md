# Backend API Documentation

## POST `/user/register`

Register a new user account.

### Description

This endpoint creates a new user in the database with a hashed password and returns the created user object along with a JSON Web Token (JWT) for authentication.

### Request

- **Method:** `POST`
- **URL:** `/user/register`
- **Content-Type:** `application/json`

#### Required Request Body

```json
{
  "fullname": {
    "firstname": "string (required, min 3 characters)",
    "lastname": "string (optional, min 3 characters)"
  },
  "email": "string (required, valid email format)",
  "password": "string (required, min 6 characters)"
}
```

#### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Validation Rules

| Field | Requirement | Message on failure |
|-------|-------------|--------------------|
| `fullname.firstname` | Minimum 3 characters | first name must be at least 3 characters |
| `email` | Valid email format | Invalid email |
| `password` | Minimum 6 characters | Password must be at least 6 characters |

### Response

#### Success — `201 Created`

```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": ""
  },
  "token": "jwt_token_here"
}
```

#### Validation Error — `400 Bad Request`

Returned when request body fails express-validator validation.

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### Internal Server Error — `500 Internal Server Error`

Returned when an unexpected server error occurs (for example, database failure or missing environment variables).

```json
{
  "message": "Internal Server Error"
}
```

### Notes

- The password is hashed using `bcrypt` before being stored in the database.
- The returned JWT is signed with `process.env.JWT_SECRET` and expires in `7d`.
