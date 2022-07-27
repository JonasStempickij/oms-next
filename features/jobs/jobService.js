import axios from 'axios';

const API_URL = '/api/jobs/';

// Add new job
const addJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData);

  return response.data;
};

// Get jobs (with filters)
const getJobs = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Get single job
const getSingleJob = async (jobID) => {
  const response = await axios.get(`${API_URL}${jobID}`, jobID);

  return response.data;
};

// Delete job
const deleteJob = async (jobID) => {
  const response = await axios.delete(`${API_URL}${jobID}`);

  return response.data;
};

// Update job
const updateJob = async (job) => {
  const { _id } = job;
  console.log(job);
  const response = await axios.put(`${API_URL}${_id}`, job);

  return response.data;
};

const jobService = {
  addJob,
  getJobs,
  deleteJob,
  getSingleJob,
  updateJob,
};

export default jobService;
