import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getJobs } from '../features/jobs/jobsSlice';

const SearchForm = () => {
  const dispatch = useDispatch();

  const [material, setMaterial] = useState('All');
  const [thickness, setThickness] = useState('');
  const [client, setClient] = useState('');

  const materialOptions = [
    'All',
    'S235',
    'DC01',
    'S355MC ESD',
    'AISI304',
    'AISI316',
    'AISI430',
    'AW-5754',
    'AW-1050',
    'Zn',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getJobs({ client, material, thickness }));
  };

  return (
    <form
      className="flex flex-row gap-6 items-end max-w-screen-lg justify-start mx-auto px-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Client</label>
        <input
          className="h-full w-52 text-base px-4 py-2.5 border border-gray-500 rounded"
          type="text"
          value={client}
          onChange={(e) => {
            setClient(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Material</label>
        <select
          className="h-full w-52 text-base px-4 py-2.5 border border-gray-500 rounded"
          name="material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          {materialOptions.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Thickness</label>
        <input
          className="h-full w-20 text-base px-4 py-2.5 border border-gray-500 rounded"
          type="number"
          value={thickness}
          onChange={(e) => {
            setThickness(e.target.value);
          }}
        />
      </div>
      <button className="btn">Search</button>
    </form>
  );
};

export default SearchForm;
