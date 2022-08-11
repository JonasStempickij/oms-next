const InputField = ({
  name,
  value,
  label,
  index = null,
  type = 'text',
  handleInputChange,
  required = false,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-500" htmlFor="client">
        {label ? label : name}
      </label>
      <input
        className="px-4 py-2.5 border border-gray-400 rounded"
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={(e) => handleInputChange(e, index)}
      />
    </div>
  );
};

export default InputField;
