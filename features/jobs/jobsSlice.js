import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteFile } from '../../lib/firebase';
import jobService from './jobService';

import { materialOptions } from '../../lib/materialOptions';

const initialState = {
  isLoading: false,
  isEditJob: false,
  jobs: [],
  materialOptions,
  currentJob: {
    client: '',
    fileName: '',
    downloadURL: null,
    jobParts: [
      {
        partName: '',
        material: 'S235',
        surface: '',
        pvc: false,
        thickness: '',
        finishedQty: 0,
        orderedQty: 0,
      },
    ],
  },
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setInputField(state, action) {
      const { name, value, index } = action.payload;
      if (name === 'client') {
        state.currentJob[name] = value;
      } else {
        console.log(index, name, value);
        state.currentJob.jobParts[index][name] = value;
      }
    },
    addJobPart(state) {
      state.currentJob.jobParts.push(initialState.currentJob.jobParts[0]);
    },
    removeJobPart(state, action) {
      const index = action.payload;
      console.log(index);
      state.currentJob.jobParts.splice(index, 1);
    },
    setFileName(state, action) {
      state.currentJob.fileName = action.payload;
    },
    reset(state) {
      state.currentJob = initialState.currentJob;
      state.isEditJob = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.currentJob = action.payload.data;
      })
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(getSingleJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEditJob = true;
        state.currentJob = action.payload.jobs;
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload.id);
      });
  },
});

export const addJob = createAsyncThunk('jobs/create', async (jobData) => {
  try {
    return await jobService.addJob(jobData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectedWithValue(message);
  }
});

export const getJobs = createAsyncThunk('jobs/getJobs', async (filter = {}) => {
  try {
    return await jobService.getJobs(filter);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectedWithValue(message);
  }
});

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (jobID) => {
  try {
    const response = await jobService.deleteJob(jobID);
    await deleteFile(jobID);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectedWithValue(message);
  }
});

export const getSingleJob = createAsyncThunk(
  'jobs/getSingleJob',
  async (jobID) => {
    try {
      return await jobService.getSingleJob(jobID);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectedWithValue(message);
    }
  }
);

export const updateJob = createAsyncThunk('jobs/updateJob', async (job) => {
  try {
    return await jobService.updateJob(job);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectedWithValue(message);
  }
});

const { actions, reducer } = jobsSlice;

export const { setInputField, reset, addJobPart, removeJobPart, setFileName } =
  actions;

export default reducer;
