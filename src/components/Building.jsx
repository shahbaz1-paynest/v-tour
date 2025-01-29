import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Building = ({ image, alt, links }) => {
  return (
    <div className="image-map-container">
      <img src={image} alt={alt} className="image-map" />
      {links.map((link, index) => (
        <Link key={index} to={link.to}>
          <svg className="highlight" style={{ top: link.position.top, left: link.position.left }}>
            <circle cx="50" cy="50" r="20" />
          </svg>
        </Link>
      ))}
    </div>
  );
};

export default Building;