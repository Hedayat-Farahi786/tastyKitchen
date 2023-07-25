import { motion } from 'framer-motion';

const ProductCard = ({ name, description, options, image, onChooseOptions }) => {


  return (
    <motion.div
    onClick={onChooseOptions}
      className="md:w-72 w-80 cursor-pointer flex flex-col items-start justify-between shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl"
    >
      <img src={image} alt={name} className="h-56 max-h-72 w-full object-cover" />
      <div className="px-4 pt-4">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 text-xs">{description}</p>



         

        </div>
            <div className="w-full flex items-end justify-end">
            <div className=" transition-all duration-200 linear hover:bg-[#e53935] hover:text-white text-primary px-4 py-1 rounded-br-lg border border-[#E53935]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
            </div>
            </div>
    </motion.div>
  );
};

export default ProductCard;