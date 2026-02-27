# React Jobs Project


## Usage

 
### Mock Server

1. Open a terminal in the `backend/api-fake-server` directory

2. Install Dependencies

```bash
npm install
```

3. Start the JSON-Server

```bash
npm run dev
```

4. The server will run on http://localhost:8000

### Frontend-simplified and/or Frontend

1. Open another terminal in the `frontend` directory (or `frontend-simplified`)

2. Install Dependencies 

```bash
npm install
```

3. Start the App

```bash
npm run dev
```

React will run on http://localhost:3000


### Api Server

1. Open another terminal in the `backend/api-server-starter` directory

2. Install Dependencies

```bash
npm install
```

3. Start the Server

```bash
npm run dev
```

4. The server will run on http://localhost:4000

---
## Other

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### About 
This is the jobs listing project based on the [YouTube crash course](https://youtu.be/LDB4uaJ87e0).

<img src="./frontend/public/screen.png" />

---

## Mongoose toJSON Configuration

This following code modifies how job objects are returned as JSON:

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

As a result, this makes the API response cleaner and easier to use in the frontend. The API returns objects like:

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