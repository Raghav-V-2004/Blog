// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Blog</h1>
        <nav>
          <Link to="/" className="text-white hover:text-gray-400 ml-4">Home</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
