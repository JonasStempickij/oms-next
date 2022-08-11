import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getJobs } from '../features/jobs/jobsSlice';
import { materialOptions } from '../lib/materialOptions';

const SearchForm = () => {
  const dispatch = useDispatch();

  const [material, setMaterial] = useState(materialOptions[0].materialName);
  const [thickness, setThickness] = useState('');
  const [client, setClient] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getJobs({ client, material, thickness }));
  };

  return (
    <form
      className="container mx-auto flex flex-row items-end w-full gap-5 "
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Client</label>
        <input
          className=" w-52 text-base px-4 py-2.5 border border-gray-500 rounded"
          type="text"
          value={client}
          onChange={(e) => {
            setClient(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col ">
        <label className="text-xs text-gray-500">Material</label>
        <select
          className="w-52 px-4 py-2.5 border border-gray-500 rounded"
          name="material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          {materialOptions.map((option, index) => {
            return (
              <option key={index} value={option.materialName}>
                {option.materialName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Thickness</label>
        <input
          className="w-20 text-base px-4 py-2.5 border border-gray-500 rounded"
          type="number"
          value={thickness}
          onChange={(e) => {
            setThickness(e.target.value);
          }}
        />
      </div>
      <button className="px-6 py-2 rounded-full text-sm font-medium text-white bg-sky-700 hover:bg-sky-600">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
