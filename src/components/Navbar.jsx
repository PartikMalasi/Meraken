import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center flex-col col-span-4 sticky top-0 bg-white shadow-lg p-4 z-10 gap-4">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        <img src="/meraken.png" alt="" />
      </Link>
    </div>
  );
};

export default Navbar;
