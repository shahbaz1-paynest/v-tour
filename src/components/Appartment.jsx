import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

const Apartment = (props) => {
  const { apartmentName } = useParams();
  
  if (!props || !apartmentName || !props[apartmentName]) {
    return <div>Apartment not found</div>;
  }

  const apartment = props[apartmentName];

  return (
    <div className="image-map-container">
      <img src={apartment.image} alt={apartment.alt} className="image-map" />
      {apartment.links.map((link, index) => (
        <Link 
          key={index} 
          to={link.to} 
          className="floor-rectangle" 
          style={{ top: link.position.top, left: link.position.left }}
        >
          <div className="rectangle-content">{link.content}</div>
        </Link>
      ))}
    </div>
  );
};

export default Apartment;