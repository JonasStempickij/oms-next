import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Router from 'next/router';
import Head from 'next/head';

import { uploadFile } from '../lib/firebase';
import { toast } from 'react-toastify';
import Form from '../components/Form';

import {
  addJob,
  reset,
  updateJob,
  setInputField,
  addJobPart,
  removeJobPart,
  setFileName,
} from '../features/jobs/jobsSlice';

export default function AddJob() {
  const dispatch = useDispatch();
  const { currentJob, materialOptions, isEditJob } = useSelector(
    (state) => state.jobState
  );
  const [file, setFile] = useState(null);
  const { client, jobParts } = currentJob;

  useEffect(() => {
    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e, index = null) => {
    console.log(e);
    if (index === null || index === undefined) {
      dispatch(setInputField({ name: e.target.name, value: e.target.value }));
    } else;
    dispatch(
      setInputField({
        index,
        name: e.target.name,
        type: e.target.type,
        value: e.target.value,
      })
    );
  };

  const handleToggleOpChange = (name, value) => {
    dispatch(setInputField({ name, value: !value }));
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length === 1) {
      await dispatch(setFileName(e.target.files[0].name));
      await setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client || !jobParts) return;
    if (!file) {
      toast.error('Please select file to upload');
      return;
    }
    try {
      const response = await dispatch(addJob(currentJob));
      const { _id } = response.payload.data;
      const downloadURL = await uploadFile(file, _id);
      const afterUpdate = await dispatch(
        updateJob({ _id, downloadURL: downloadURL })
      );
      toast.success('Job added');
      Router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Add Job</title>
      </Head>
      <main className="">
        <h2 className="text-center text-3xl ">Add Job</h2>
        <Form
          isEditJob={isEditJob}
          currentJob={currentJob}
          handleInputChange={handleInputChange}
          handleToggleOpChange={handleToggleOpChange}
          addJobPart={() => {
            dispatch(addJobPart());
          }}
          removeJobPart={() => {
            dispatch(removeJobPart());
          }}
          handleFileChange={handleFileChange}
          handleSubmitJob={handleSubmit}
          materialOptions={materialOptions}
        />
      </main>
    </>
  );
}
