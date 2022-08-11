import mongoose from 'mongoose';

const Job = new mongoose.Schema(
  {
    client: {
      /* The clinet of this job */
      type: String,
      required: [true, 'Please provide client name'],
      maxlength: [60, "Owner's Name cannot be more than 60 characters"],
    },
    jobParts: {
      type: Array,
      required: [true, 'Please provide job parts'],
    },
    fileName: {
      type: String,
      required: [true, 'Please provide file URL'],
    },
    downloadURL: {
      type: String,
    },
    bendOp: {
      type: Boolean,
    },
    weldOp: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model('Job', Job);
