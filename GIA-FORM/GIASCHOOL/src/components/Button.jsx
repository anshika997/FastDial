export default function Button({
  onClick, 
  buttonName
}) {
  return (
    <div>
      <button
        onClick={onClick} 
        className="bg-white text-black mt-4 font-extrabold w-full rounded-3xl py-3 px-4 transition duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 border shadow-xl hover:shadow-xl"
      >
        {buttonName} 
      </button>
    </div>
  );
}

