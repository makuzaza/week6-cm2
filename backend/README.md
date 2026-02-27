## MongoDB Schema JSON Transformation

This code modifies how job objects are returned as JSON:

```js
jobSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
```

- **toJSON** configures how MongoDB documents are converted to JSON.
- **virtuals: true** includes virtual fields when the object is converted to JSON.
- **ret.id = ret._id** creates a new id field based on MongoDB _id.
- **delete ret._id** removes the original MongoDB _id field.
- **delete ret.__v** removes the version field automatically created by MongoDB.

As a result, the API returns cleaner objects like:

```json
{
  "id": "65fa12...",
  "title": "Developer",
  "company": "Example"
}
```

instead of:

```json
{
  "_id": "65fa12...",
  "__v": 0,
  "title": "Developer",
  "company": "Example"
}
```

---

## API Endpoints

Base URL: `http://localhost:4000/api`

### Users

| Method | Endpoint        | Description       | Auth Required |
|--------|------------------|-------------------|---------------|
| POST   | `/users/signup`  | Register new user | No            |
| POST   | `/users/login`   | Login user        | No            |

---

### Jobs

| Method | Endpoint                     | Description                      | Auth Required |
|--------|-------------------------------|----------------------------------|---------------|
| GET    | `/jobs`                       | Get all jobs                     | No            |
| GET    | `/jobs/:jobId`                | Get one job by ID                | No            |
| GET    | `/jobs/salary?min=5000&max=6000` | Filter jobs by salary range   | No            |
| POST   | `/jobs`                       | Create a new job                 | Yes (Bearer token) |
| PUT    | `/jobs/:jobId`                | Update job by ID                 | Yes (Bearer token) |
| DELETE | `/jobs/:jobId`                | Delete job by ID                 | Yes (Bearer token) |

---

### Notes

- Protected job routes require header:

  `Authorization: Bearer <token>`

- `:jobId` must be a valid MongoDB ObjectId.
