function Loader() {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-white animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-gray-400 animate-spin-slow"></div>
      </div>

      <p className="text-white mt-8 text-lg tracking-widest animate-pulse">
        Analyzing Resume, Please Wait...
      </p>
    </div>
  );
}

export default Loader;
