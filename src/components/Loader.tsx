// src/components/Loader.tsx

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full p-8">
      <div
        className="w-12 h-12 rounded-full animate-spin
                  border-4 border-solid border-blue-500 border-t-transparent"
      ></div>
    </div>
  );
};

export default Loader;
