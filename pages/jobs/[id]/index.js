import { useRouter } from 'next/router';
import Form from '../../../components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../lib/firebase';
import {
  setInputField,
  addJobPart,
  getSingleJob,
  deleteJob,
  updateJob,
  removeJobPart,
  setFileName,
} from '../../../features/jobs/jobsSlice';

const EditJob = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;

  const { isLoading, isEditJob, currentJob, materialOptions } = useSelector(
    (state) => state.jobState
  );

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getSingleJob(id));
    }
  }, [dispatch, id]);

  const handleInputChange = (e, index) => {
    let value;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    const name = e.target.name;
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

  const handleFileChange = async (e) => {
    if (e.target.files.length === 1) {
      await setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    try {
      await dispatch(setFileName(file.name));
      const downloadURL = await uploadFile(file, id);
      console.log(downloadURL);
      const updated = await dispatch(
        updateJob({ _id: id, downloadURL, fileName: file.name })
      );
      toast.success('Files uploaded');
      console.log(updated);
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

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
            handleFileChange={handleFileChange}
            handleFileUpload={handleFileUpload}
            handleUpdateJob={handleUpdateJob}
            materialOptions={materialOptions}
          />
        </>
      )}
    </>
  );
};

export default EditJob;
