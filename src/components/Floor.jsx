import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

const Floor = (props) => {
  const { floorName } = useParams();
  
  if (!props || !floorName || !props[floorName]) {
    return <div>Floor not found</div>;
  }

  const floor = props[floorName];

  return (
    <div className="image-map-container">
      <img src={floor.image} alt={floor.alt} className="image-map" />
      {floor.links.map((link, index) => (
        <Link 
          key={index} 
          to={link.to} 
          className="circle-highlight" 
          style={{ top: link.position.top, left: link.position.left }}
        >
          <div className="circle-content"></div>
        </Link>
      ))}
    </div>
  );
};

export default Floor;
