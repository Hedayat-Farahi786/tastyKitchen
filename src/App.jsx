import Navbar from "./components/Navbar";

import { Flowbite } from "flowbite-react";
import LoadingPage from "./components/LoadingPage";
import Products from "./components/Products";
import { useState } from "react";
import Menu from "./components/Menu";
import Carousel from "./components/Carousel";

const customTheme = {
  button: {
    color: {
      primary: "bg-[#E53935] hover:bg-[#E53935] text-white",
    },
  },
};

const App = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleLoadingComplete = (complete) => {
    setIsLoadingComplete(complete);
  };
  return (
    <>
      {isLoadingComplete ? (
        <div className="w-full overflow-x-hidden relative">
          <Flowbite theme={{ theme: customTheme }}>
            <Navbar />
            {/* <Products /> */}
            <Carousel />
            <Menu />
          </Flowbite>
        </div>
      ) : (
        <LoadingPage setLoadingComplete={handleLoadingComplete} />
      )}
    </>
  );
};

export default App;
