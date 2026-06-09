
export default function LabelledInput({ label, placeholder, onChange, type, name }) {
  
  return (
    <div className="relative">
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        name={name}
        onChange={onChange}
        type={type || "text"}
        className="w-full p-2 mb-4 border rounded-lg bg-gray-100"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
