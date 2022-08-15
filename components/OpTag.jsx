import React from 'react';

const OpTag = ({ name }) => {
  return (
    <div className="rounded-lg text-sm px-2 py-1 font-medium bg-orange-800 text-gray-100">
      {name}
    </div>
  );
};

export default OpTag;
