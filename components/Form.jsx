import { useState } from 'react';
import InputField from './InputField';
import ToggleTag from './ToggleTag';

const Form = ({
  isEditJob,
  materialOptions,
  currentJob,
  handleInputChange,
  handleToggleOpChange,
  addJobPart,
  removeJobPart,
  handleFileChange,
  handleFileUpload,
  handleDeleteJob,
  handleUpdateJob,
  handleSubmitJob,
}) => {
  const { client, jobParts, weldOp, bendOp } = currentJob;

  return (
    <form
      className="flex flex-col max-w-screen-md mx-auto gap-4"
      onSubmit={isEditJob ? handleUpdateJob : handleSubmitJob}
    >
      <InputField
        name="client"
        value={client}
        handleInputChange={handleInputChange}
        required={true}
      />
      <div className="flex gap-4">
        <ToggleTag
          label="WELD"
          name="weldOp"
          value={weldOp}
          toggleTagState={handleToggleOpChange}
        />
        <ToggleTag
          label="BEND"
          name="bendOp"
          value={bendOp}
          toggleTagState={handleToggleOpChange}
        />
      </div>

      {jobParts.map((jobPart, index) => {
        const {
          partName,
          material,
          orderedQty,
          finishedQty,
          thickness,
          surface,
          pvc,
        } = jobPart;
        return (
          <div className="flex flex-col gap-1.5" key={index}>
            <InputField
              name="partName"
              label="Part"
              value={partName}
              index={index}
              handleInputChange={handleInputChange}
            />
            <div className="flex gap-4">
              <div className="flex flex-col">
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

              {materialOptions.map((materialOption, matIndex) => {
                if (
                  materialOption.materialName === material &&
                  materialOption.hasSurf
                ) {
                  return (
                    <div key={matIndex} className="flex flex-col  gap-1">
                      <label className="text-xs text-gray-500">Surface</label>
                      <select
                        className="h-full w-52 text-base px-4 py-2.5 border border-gray-400 rounded"
                        name="surface"
                        value={surface}
                        onChange={(e) => {
                          handleInputChange(e, index);
                        }}
                      >
                        {materialOption.surfOptions.map((surfOption, index) => {
                          return (
                            <option key={index} value={surfOption}>
                              {surfOption}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }
              })}

              <InputField
                name="thickness"
                value={thickness}
                type="number"
                index={index}
                handleInputChange={handleInputChange}
              />

              {materialOptions.map((materialOption, matIndex) => {
                if (
                  materialOption.materialName === material &&
                  materialOption.hasPVC
                ) {
                  return (
                    <div key={matIndex} className="flex flex-col  gap-3">
                      <label className="text-xs text-gray-500">+PVC</label>
                      <input
                        defaultChecked={pvc}
                        name="pvc"
                        type="checkbox"
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-6 h-6 slate-800"
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex flex-row items-end gap-4">
              {isEditJob && (
                <InputField
                  name="finishedQty"
                  value={finishedQty}
                  type="number"
                  label="Finished"
                  index={index}
                  handleInputChange={handleInputChange}
                />
              )}

              <InputField
                name="orderedQty"
                value={orderedQty}
                type="number"
                label="Ordered"
                index={index}
                handleInputChange={handleInputChange}
              />

              <button
                className="rounded-full text-xs px-4 py-1.5 font-medium text-white bg-rose-900 hover:bg-rose-700 "
                type="button"
                onClick={() => removeJobPart(index)}
              >
                REMOVE PART
              </button>
            </div>
          </div>
        );
      })}

      <div className="flex items-start gap-2">
        <input className="" type="file" onChange={handleFileChange} />
        {isEditJob && (
          <button
            type="button"
            onClick={handleFileUpload}
            className="rounded-full text-sm px-6 py-2.5 font-medium text-white bg-zinc-800 hover:bg-zinc-500"
          >
            Upload files
          </button>
        )}
      </div>

      <div className="flex gap-4 pt-2">
        <button className="btn" type="button" onClick={addJobPart}>
          Add Part
        </button>
        <div className="flex gap-4 ml-auto">
          <button
            type="button"
            onClick={handleDeleteJob}
            className="rounded-full text-sm px-6 py-2.5 font-medium text-white bg-red-600 hover:bg-red-500"
          >
            Delete Job
          </button>

          <button
            className="rounded-full text-sm px-6 py-2.5 font-medium text-white bg-green-700 hover:bg-green-600"
            type="submit"
          >
            {isEditJob ? 'Update Job' : 'Submit Job'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
