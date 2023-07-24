import { Button } from 'flowbite-react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';

import { Flowbite } from 'flowbite-react';
import LoadingPage from './components/LoadingPage';
import { useState } from 'react';
import Menu from './components/Menu';

const customTheme = {
  button: {
    color: {
      primary: 'bg-[#E53935] hover:bg-[#E53935] text-white',
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
        <div className="w-full overflow-x-hidden">
          <Flowbite theme={{ theme: customTheme }}>
            <Landing />
            <Menu />
          </Flowbite >
        </div>
      ) : (
        <LoadingPage setLoadingComplete={handleLoadingComplete} />
      )}
    </>
  )
}

export default App