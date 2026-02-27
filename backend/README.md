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