import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, reset, updateJob } from '../features/jobs/jobsSlice';

import {
  setInputField,
  addJobPart,
  setFileName,
} from '../features/jobs/jobsSlice';
import Link from 'next/link';
import Router from 'next/router';

import { uploadFile } from '../lib/base';

export default function AddJob() {
  const dispatch = useDispatch();
  const { currentJob, materialOptions } = useSelector(
    (state) => state.jobState
  );
  const [file, setFile] = useState(null);
  const { client, jobParts, fileName } = currentJob;

  useEffect(() => {
    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e, index = null) => {
    if (index === null) {
      dispatch(setInputField({ name: e.target.name, value: e.target.value }));
    } else
      dispatch(
        setInputField({
          index,
          name: e.target.name,
          type: e.target.type,
          value: e.target.value,
        })
      );
  };

  const handleFileChange = async (e) => {
    await dispatch(setFileName(e.target.files[0].name));
    await setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client || !jobParts) return;
    const response = await dispatch(addJob(currentJob));
    const { _id } = response.payload.data;
    const downloadURL = await uploadFile(file, _id);
    console.log(downloadURL);
    const afterUpdate = await dispatch(
      updateJob({ _id, downloadURL: downloadURL })
    );
    console.log(`response after update with file name `);
    console.log(afterUpdate);
    // Router.push('/');
  };

  return (
    <main className="">
      <h2 className="text-center text-3xl ">Add Job</h2>
      <form
        className="max-w-screen-md px-12 mx-auto flex flex-col gap-4 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500" htmlFor="client">
            Client
          </label>
          <input
            className="px-4 py-2.5 border border-gray-400 rounded"
            type="text"
            name="client"
            value={client}
            required
            onChange={handleInputChange}
          />
        </div>
        {jobParts.map((jobPart, index) => {
          const { partName, material, orderedQty, finishedQty, thickness } =
            jobPart;
          return (
            <div className="flex flex-col pt-2 gap-1.5" key={index}>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500" htmlFor="name">
                  Part
                </label>
                <input
                  className="px-4 py-2.5 border border-gray-400 rounded"
                  type="text"
                  name="partName"
                  value={partName}
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col  gap-1">
                  <label className="text-xs text-gray-500" htmlFor="material">
                    Material
                  </label>
                  <select
                    className="h-full w-52 text-base px-4 py-2.5 border border-gray-400 rounded"
                    type="text"
                    name="material"
                    value={material}
                    onChange={(e) => {
                      handleInputChange(e, index);
                    }}
                  >
                    {materialOptions.map((material, index) => {
                      const { materialName } = material;
                      return (
                        <option key={index} value={materialName}>
                          {materialName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500" htmlFor="thickness">
                    Thickness
                  </label>
                  <input
                    className="w-20 px-4 py-2.5 border border-gray-400 rounded"
                    type="number"
                    name="thickness"
                    value={thickness}
                    onChange={(e) => {
                      handleInputChange(e, index);
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs text-gray-500"
                    htmlFor="finishedQty"
                  >
                    Finished
                  </label>
                  <input
                    className="w-24 px-4 py-2.5 border border-gray-400 rounded"
                    type="number"
                    name="finishedQty"
                    value={finishedQty}
                    onChange={(e) => {
                      handleInputChange(e, index);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500" htmlFor="orderedQty">
                    Ordered
                  </label>
                  <input
                    className="w-24 px-4 py-2.5 border border-gray-400 rounded"
                    type="number"
                    name="orderedQty"
                    value={orderedQty}
                    onChange={(e) => {
                      handleInputChange(e, index);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <input type="file" onChange={handleFileChange} />
        <div className="flex gap-4 pt-2">
          <button
            className="btn"
            type="button"
            onClick={() => dispatch(addJobPart())}
          >
            Add Part
          </button>
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
