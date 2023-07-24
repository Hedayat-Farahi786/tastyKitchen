import React from 'react'
import Carousel from './Carousel'
import Navbar from './Navbar'

const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center relative">
        <Navbar />
      <div className="w-full ">
        <Carousel />
      </div>
    </div>
  )
}

export default Landing