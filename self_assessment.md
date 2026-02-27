# Self-Assessment

### Example 1: Improving filterJobsBySalary Endpoint

We decided to create the `filterJobsBySalary` endpoint because filtering jobs by salary is a key feature for users. Salary is often one of the most important criteria when searching for jobs, so we wanted to provide a reliable and user-friendly way to filter listings.

Initially, the endpoint was simple and looked like this:

```javascript
const filterJobsBySalary = async (req, res) => {
  try {
    const jobs = await Job.find({
      salary: { $gte: req.query.min, $lte: req.query.max }
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```
It worked for requests like: 
`GET http://localhost:4000/api/jobs/salary?min=5000&max=6000`  

**Problems Encountered:**

1. `min` or `max` were not numbers → returned  400 error.
2. Salary field sometimes was missing or in unexpected format → handled with filtering.
3. Original approaches were insufficient for complex salary strings.

To address these issues, we refactored the code to handle edge cases effectively:  

```javascript
// GET /jobs/salary?min=4000&max=9000
const filterJobsBySalary = async (req, res) => {
  const minSalary = Number(req.query.min);
  const maxSalary = Number(req.query.max);

  if (!Number.isFinite(minSalary) || !Number.isFinite(maxSalary)) {
    return res.status(400).json({ message: "min and max must be numbers" });
  }

  try {
    const jobs = await Job.find({});
    const filtered = jobs.filter((job) => {
      if (!job.salary) return false;

      const nums = String(job.salary)
        .match(/\d+/g)
        ?.map(Number)
        .filter(Number.isFinite) || [];

      if (!nums.length) return false;

      const low = Math.min(...nums);
      const high = Math.max(...nums);

      return high >= minSalary && low <= maxSalary;
    });

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```
**Key Improvements:**

- **Validation:** Ensured that `min` and `max` are finite numbers before filtering. 
- **Filtering:** Handled salary strings with multiple numbers, missing salaries, or invalid formats.
- **User-Friendly:** Clear error messages and robust behavior for various edge cases.

---

### Example 2: Debugging Route Order in Express

After implementing the `filterJobsBySalary` endpoint, we also encountered an issue with routing in our `jobRoutes.js` file. Here's the problematic setup:  

```javascript
// Problematic route order
router.get('/:id', getJobById);
router.get('/salary', filterJobsBySalary);
```
Requests to `/api/jobs/salary` returned "Invalid ID" errors because Express evaluated the dynamic `/:id` route before `/salary`. This happened because Express matches routes in the order they are defined.  

**Solution:**

- I reordered the routes to prioritize specific routes before dynamic ones:  

```javascript
// Corrected route order
router.get('/salary', filterJobsBySalary); // Specific route comes first
router.get('/:id', getJobById); // Dynamic route follows
router.get('/', getAllJobs);
```

**Lessons Learned:**

1. **Route Evaluation in Express:** Specific routes must be defined before dynamic routes.
2. **Testing Matters:** Testing helped uncover subtle routing issues that could break production endpoints.

---

### Example 3: MongoDB Atlas Connection on Render

I had issues connecting to MongoDB Atlas from my Render deployment. Locally, everything worked fine, but the deployed app could not fetch data.

**Investigation & Solution:**

1. Tested local endpoints → worked.
2. Deployed to Render → connection failed.
3. Tested hardcoded endpoints (/test, /jobs) → worked on Render.
4. Discovered the issue: MongoDB Atlas restricts connections by IP.
5. Added Render IPs to Atlas whitelist → deployment successfully fetched data.

**Lessons Learned:**

- **Understand External Restrictions:** Cloud deployments may require additional network configuration.
- **Debugging Strategy:** Test endpoints incrementally and compare local vs deployed behavior.

---

### Example 4: Query Parameter Fix for Job Limit

Initially, I tried:

```
/api/jobs?limit=3
```

But the correct query parameter in our backend was _limit:

```
/api/jobs?_limit=3
```

**Lesson Learned:**

- Pay attention to backend conventions and query parameter names; small mismatches can break expected behavior.