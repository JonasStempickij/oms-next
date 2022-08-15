import axios from 'axios';

const API_URL = '/api/jobs/';

const addJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData);

  return response.data;
};

const getJobs = async ({ client = '', material = '', thickness = '' }) => {
  const response = await axios.get(
    `${API_URL}?client=${client}&material=${material}&thickness=${thickness}`
  );

  return response.data;
};

const getSingleJob = async (jobID) => {
  const response = await axios.get(`${API_URL}${jobID}`, jobID);

  return response.data;
};

const deleteJob = async (jobID) => {
  const response = await axios.delete(`${API_URL}${jobID}`);

  return response.data;
};

const updateJob = async (job) => {
  const { _id } = job;
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
