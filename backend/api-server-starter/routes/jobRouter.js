const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  filterJobsBySalary,
} = require("../controllers/jobControllers");

const router = express.Router();

router.get("/salary", filterJobsBySalary);
router.get("/:jobId", getJobById);
router.get("/", getAllJobs);
router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

module.exports = router;
