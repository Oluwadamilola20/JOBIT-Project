import mongoose from "mongoose"
import locationSchema from "../validations/locationValidation.js";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
    },
    jobLocation: {
      type: locationSchema,
      required: [true, 'Location is required'],
      default: 'Lagos'
    },
    jobDescription: {
      type: String,
      required: [true, 'Job description is required'],
    },
    jobType: {
      type: String,
      required: true,
      enum: ['full-time', 'part-time','contract','internship'],
      default: 'full-time'
    },
    jobRequirements: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
  },
  { timestamps: true }
)

const Job = mongoose.model("job", jobSchema);

export default Job;