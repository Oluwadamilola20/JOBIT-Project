import express from "express"
import { isLogin } from "../middleware/authMiddleware.js"
import { 
    createJobController,
    getAllJobsController,
    updateJobController,
    deleteJobController,
    jobStatsController } from "../controllers/jobController.js"

const router = express.Router()

//routes
//Create Jobs || Post
router.post("/create-job", isLogin, createJobController)

//GET JOBS || GET
router.get("/get-job", isLogin, getAllJobsController);

//UPDATE JOBS ||  PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

//DELETE JOBS || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

// JOBS STATS FILTER || GET
router.get("/job-stats", userAuth, jobStatsController);

export default router