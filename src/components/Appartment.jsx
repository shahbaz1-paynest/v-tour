import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Appartment = ({ image, alt, links }) => {
  return (
    <div className="image-map-container">
      <img src={image} alt={alt} className="image-map" />
      {links.map((link, index) => (
        <Link key={index} to={link.to} className="floor-rectangle" style={{ top: link.position.top, left: link.position.left }}>
          <div className="rectangle-content">{link.content}</div>
        </Link>
      ))}
    </div>
  );
};

export default Appartment;