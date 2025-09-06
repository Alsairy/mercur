# Government API

This API provides endpoints for managing government entities, officials, and oversight functions for the Madares Market platform.

## Endpoints

### Authentication
- `POST /government/auth/nafath` - Authenticate using Nafath SSO

### Government Entities
- `GET /government/entities` - List government entities
- `POST /government/entities` - Create government entity
- `GET /government/entities/:id` - Get government entity
- `PUT /government/entities/:id` - Update government entity
- `DELETE /government/entities/:id` - Delete government entity

### Government Officials
- `GET /government/officials` - List government officials
- `POST /government/officials` - Create government official
- `GET /government/officials/:id` - Get government official
- `PUT /government/officials/:id` - Update government official
- `DELETE /government/officials/:id` - Delete government official

### Oversight & Requests
- `GET /government/oversight` - Get oversight dashboard
- `GET /government/requests` - List government requests
- `POST /government/requests` - Create service request
- `POST /government/requests/:id/approve` - Approve service request
- `GET /government/dashboard` - Get government dashboard

## Authentication

All government endpoints require authentication. Use Nafath SSO for government officials.

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Success Responses

All endpoints return standardized success responses:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```
