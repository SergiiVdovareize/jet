import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={{ marginBottom: '20px', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" style={{ textDecoration: 'none', color: '#007bff' }}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" style={{ textDecoration: 'none', color: '#007bff' }}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
