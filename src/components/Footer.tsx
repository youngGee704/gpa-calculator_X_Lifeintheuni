
import { Link } from 'react-router-dom';
import { Mail, Phone, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/lovable-uploads/c5ef713b-88e0-4f41-9479-fc49556e5dfc.png" alt="GRIDVEM Logo" className="h-10 w-10 mr-3" />
              <img src="/lovable-uploads/998b8c4d-175b-40c7-a061-24b4761da881.png" alt="Life In the University Logo" className="h-10 w-10" />
            </div>
            <p className="text-sm text-gray-400">
              A Nigerian university GPA/CGPA calculator developed by GRIDVEM in collaboration with Life In the University.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/gpa-calculator" className="text-gray-400 hover:text-white transition-colors">GPA Calculator</Link></li>
              <li><Link to="/cgpa-calculator" className="text-gray-400 hover:text-white transition-colors">CGPA Calculator</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <div>
                  <h4 className="text-white text-sm">GRIDVEM Email:</h4>
                  <a href="mailto:gridvem704@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                    gridvem704@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <div>
                  <h4 className="text-white text-sm">Life In the University Email:</h4>
                  <a href="mailto:lifeintheuniversity.ng@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                    lifeintheuniversity.ng@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <div>
                  <h4 className="text-white text-sm">Developer's WhatsApp:</h4>
                  <a href="https://api.whatsapp.com/send?phone=2347084072822&text=Hello%20,%20i%20am%20from%20Life%20in%20the%20University%20collab%20with%20your%20software%20..." 
                     className="text-gray-400 hover:text-white transition-colors"
                     target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GRIDVEM & Life In the University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
