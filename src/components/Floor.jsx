import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Floor = () => {
  return (
    <div className="image-map-container">
      <img
        src="/single-building.png"
        alt="Floor Map"
        className="image-map"
      />

      <Link to="/appartment" className="circle-highlight" style={{ top: '35%', left: '50%' }}>
        <div className="circle-content"></div>
      </Link>

      <Link to="/appartment" className="circle-highlight" style={{ top: '39%', left: '51%' }}>
        <div className="circle-content"></div>
      </Link>

      <Link to="/appartment" className="circle-highlight" style={{ top: '43%', left: '52%' }}>
        <div className="circle-content"></div>
      </Link>

      <Link to="/appartment" className="circle-highlight" style={{ top: '47%', left: '53%' }}>
        <div className="circle-content"></div>
      </Link>

      <Link to="/appartment" className="circle-highlight" style={{ top: '52%', left: '54%' }}>
        <div className="circle-content"></div>
      </Link>

      <Link to="/appartment" className="circle-highlight" style={{ top: '56%', left: '55%' }}>
        <div className="circle-content"></div>
      </Link>

      <Link to="/appartment" className="circle-highlight" style={{ top: '60%', left: '56%' }}>
        <div className="circle-content"></div>
      </Link>

      <Link to="/appartment" className="circle-highlight" style={{ top: '64%', left: '57%' }}>
        <div className="circle-content"></div>
      </Link>

      <Link to="/appartment" className="circle-highlight" style={{ top: '68%', left: '58%' }}>
        <div className="circle-content"></div>
      </Link>

      <Link to="/appartment" className="circle-highlight" style={{ top: '72%', left: '59%' }}>
        <div className="circle-content"></div>
      </Link>
    </div>
  );
};

export default Floor;