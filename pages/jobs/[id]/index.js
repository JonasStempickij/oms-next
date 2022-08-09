import Link from 'next/link';
import { useRouter } from 'next/router';
import Form from '../../../components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  setInputField,
  addJobPart,
  getSingleJob,
  deleteJob,
  updateJob,
  removeJobPart,
} from '../../../features/jobs/jobsSlice';

import { downloadFile } from '../../../lib/firebase';

const EditJob = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;

  const { isLoading, isEditJob, currentJob, materialOptions } = useSelector(
    (state) => state.jobState
  );

  const [downloadURL, setDownloadURL] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getSingleJob(id));
    }
  }, [dispatch, id]);

  const handleInputChange = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(setInputField({ name, value, index }));
  };

  const handleAddPart = () => {
    dispatch(addJobPart());
  };

  const handleRemovePart = (index) => {
    dispatch(removeJobPart(index));
  };

  const handleUpdateJob = (e) => {
    e.preventDefault();
    dispatch(updateJob(currentJob));

    router.push('/');
  };

  const handleDeleteJob = () => {
    dispatch(deleteJob(id));
    router.push('/');
  };

  const handleFile = async () => {};

  return (
    <>
      <h2 className="text-center text-3xl ">Edit Job</h2>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <Form
            isEditJob
            currentJob={currentJob}
            handleInputChange={handleInputChange}
            handleDeleteJob={handleDeleteJob}
            handleAddPart={handleAddPart}
            handleRemovePart={handleRemovePart}
            handleFile={handleFile}
            handleUpdateJob={handleUpdateJob}
            materialOptions={materialOptions}
          />
        </>
      )}
    </>
  );
};

export default EditJob;
