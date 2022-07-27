const Form = ({
  isEditJob,
  materialOptions,
  currentJob,
  handleInputChange,
  handleAddPart,
  handleRemovePart,
  handleFile,
  handleDeleteJob,
  handleUpdateJob,
  handleSubmitJob,
}) => {
  const { client, jobParts } = currentJob;

  return (
    <form
      className="max-w-screen-md px-12 mx-auto flex flex-col gap-4 divide-y divide-gray-200"
      onSubmit={isEditJob ? handleUpdateJob : handleSubmitJob}
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
          onChange={(e) => handleInputChange(e)}
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
                required
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
                  required
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row items-end gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500" htmlFor="finishedQty">
                  Finished
                </label>
                <input
                  className="w-24 px-4 py-2.5 border border-gray-400 rounded"
                  type="number"
                  name="finishedQty"
                  value={finishedQty}
                  required
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
                  required
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                />
              </div>
              <button
                className="rounded-full text-sm px-4 py-1.5 font-semibold text-black bg-rose-200 hover:bg-rose-300 "
                type="button"
                onClick={() => handleRemovePart(index)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
      <div className="flex gap-4 pt-2">
        <button
          type="button"
          className="rounded-full text-sm px-6 py-2.5 font-semibold text-white bg-slate-600 hover:bg-slate-500"
          onClick={handleFile}
        >
          Files
        </button>
        <button className="btn" type="button" onClick={handleAddPart}>
          Add Part
        </button>
        <div className="flex gap-4 ml-auto">
          <button
            type="button"
            onClick={handleDeleteJob}
            className="rounded-full text-sm px-6 py-2.5 font-semibold text-white bg-red-600 hover:bg-red-500"
          >
            Delete Job
          </button>
          {isEditJob && (
            <button
              className="rounded-full text-sm px-6 py-2.5 font-semibold text-white bg-green-700 hover:bg-green-600"
              type="submit"
            >
              Update Job
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
