import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Appartment = () => {
  return (
    <div className="image-map-container">
      <img
        src="/appartment.webp"
        alt="Map"
        className="image-map"
      />

      <Link to="/room" className="floor-rectangle" style={{ top: '52%', left: '34%' }}>
        <div className="rectangle-content">1</div>
      </Link>

      <Link to="/room" className="floor-rectangle" style={{ top: '44%', left: '33%' }}>
        <div className="rectangle-content">2</div>
      </Link>

      <Link to="/room" className="floor-rectangle" style={{ top: '41%', left: '45%' }}>
        <div className="rectangle-content">3</div>
      </Link>

      <Link to="/room" className="floor-rectangle" style={{ top: '41%', left: '53%' }}>
        <div className="rectangle-content">4</div>
      </Link>

      <Link to="/room" className="floor-rectangle" style={{ top: '47%', left: '45%' }}>
        <div className="rectangle-content">5</div>
      </Link>

      <Link to="/room" className="floor-rectangle" style={{ top: '47%', left: '52%' }}>
        <div className="rectangle-content">6</div>
      </Link>
    </div>
  );
};

export default Appartment;