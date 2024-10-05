import pizza from "../assets/pizza.png";

const Loader = () => {
  return (
    <div className="loading-container">
      <div className="loading-logo flex flex-col items-center justify-center space-y-3 h-screen">
        <img
          className="w-32 animate-[spin_2s_linear_infinite]"
          src={pizza}
          alt="Logo"
        />
        <span className="text-xs">Stay Hungry, Almost There...</span>
      </div>
    </div>
  );
};

export default Loader;
