import React from 'react';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
    <div className="bg-gray-100 m-6 rounded-lg">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Travelin</h1>
            <p className="mt-2 text-sm">Travelin' is all about chasing sunsets at the edge of the world, feeling the pulse of vibrant cities, and following unexpected paths to adventure. It's about discovering ourselves in stories we've never experienced before and finding wonders with every step we take. So, get ready to explore, dream, and uncover a world waiting to be discovered.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="mb-4 md:mb-0">
              <h1 className="text-lg font-semibold mb-2">Quick Links</h1>
              <Link to="/">
                <p className="text-sm">Home</p>
              </Link>
              <Link to="/destination">
                <p className='text-sm'>Destination</p>
              </Link>
              <Link to="/category">
                <p className='text-sm'>Category</p>
              </Link>
            </div>
            <div>
              <h1 className="text-lg font-semibold mb-2">Contact</h1>
              <p className="text-sm">Phone: +6282228525021</p>
              <p className="text-sm">Email: Fananiilham20@gmail.com</p>
            </div>
          </div>
        </div>
            <hr  className='border-1 border-black w-auto'/>
            <div className="flex justify-between mt-4">
                <div>
                  <p className="text-center text-sm ">© 2024 Travelin. All rights reserved.</p>
                </div>
                <div className="flex gap-4 text-2xl ">
                <a href="https://www.facebook.com/share/YpgHiaVFSi4CQ33J/?mibextid=qi2Omg"><FaFacebook /></a>
                <a href="https://www.instagram.com/ilhamfnni_?igsh=ZWczaXVieTA0dDFx"><RiInstagramFill /></a>
                <a href="https://www.linkedin.com/in/mokhamad-ilham-fanani/"><FaLinkedin /></a>
                </div>
            </div>
      </div>
    </div>
    </div>
  );
}

export default Footer;
