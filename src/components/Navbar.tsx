
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, GraduationCap, Calculator } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/lovable-uploads/c5ef713b-88e0-4f41-9479-fc49556e5dfc.png" alt="GRIDVEM Logo" className="h-10 w-10" />
            <span className="font-bold text-xl">NIGPA</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-app-green transition-colors">Home</Link>
            <Link to="/gpa-calculator" className="hover:text-app-green transition-colors">GPA Calculator</Link>
            <Link to="/cgpa-calculator" className="hover:text-app-green transition-colors">CGPA Calculator</Link>
            <Link to="/about" className="hover:text-app-green transition-colors">About</Link>
            <Link to="/contact" className="hover:text-app-green transition-colors">Contact</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3 pb-3">
              <Link to="/" className="py-2 hover:text-app-green transition-colors" onClick={toggleMenu}>Home</Link>
              <Link to="/gpa-calculator" className="py-2 hover:text-app-green transition-colors" onClick={toggleMenu}>GPA Calculator</Link>
              <Link to="/cgpa-calculator" className="py-2 hover:text-app-green transition-colors" onClick={toggleMenu}>CGPA Calculator</Link>
              <Link to="/about" className="py-2 hover:text-app-green transition-colors" onClick={toggleMenu}>About</Link>
              <Link to="/contact" className="py-2 hover:text-app-green transition-colors" onClick={toggleMenu}>Contact</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
