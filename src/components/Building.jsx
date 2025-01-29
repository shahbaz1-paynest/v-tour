// Building.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

const Building = (props) => {
  const { buildingName } = useParams();
  
  // Add console.log to debug
  console.log('Props:', props);
  console.log('Building Name:', buildingName);
  
  // Ensure props and buildingName exist
  if (!props || !buildingName || !props[buildingName]) {
    return <div>Building not found</div>;
  }

  const building = props[buildingName];

  return (
    <div className="image-map-container">
      <img src={building.image} alt={building.alt} className="image-map" />
      {building.links.map((link, index) => (
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