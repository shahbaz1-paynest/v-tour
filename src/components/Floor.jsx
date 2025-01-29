import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Floor = ({ image, alt, links }) => {
  return (
    <div className="image-map-container">
      <img src={image} alt={alt} className="image-map" />
      {links.map((link, index) => (
        <Link key={index} to={link.to} className="circle-highlight" style={{ top: link.position.top, left: link.position.left }}>
          <div className="circle-content"></div>
        </Link>
      ))}
    </div>
  );
};

export default Floor;