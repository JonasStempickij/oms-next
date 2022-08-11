import React from 'react';

const ToggleTag = ({ label, name, value, toggleTagState }) => {
  return (
    <button
      type="button"
      className={`border border-orange-800 text-gray-100 rounded-lg px-4 py-1.5 uppercase font-medium  ${
        value ? 'bg-orange-800 ' : 'text-orange-800 '
      } `}
      onClick={() => toggleTagState(name, value)}
    >
      {label}
    </button>
  );
};

export default ToggleTag;
