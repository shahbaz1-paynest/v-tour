import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Building = () => {
  return (
    <div className="image-map-container">
      <img
        src="/building.webp"
        alt="Map"
        className="image-map"
      />

      <Link to="/floor">
        <svg className="highlight" style={{ top: '50%', left: '60%' }}>
          <circle cx="50" cy="50" r="20" />
        </svg>
      </Link>

      <Link to="/floor">
        <svg className="highlight" style={{ top: '47%', left: '80%' }}>
          <circle cx="50" cy="50" r="20" />
        </svg>
      </Link>

      <Link to="/floor">
        <svg className="highlight" style={{ top: '39%', left: '68%' }}>
          <circle cx="50" cy="50" r="20" />
        </svg>
      </Link>

      <Link to="/floor">
        <svg className="highlight" style={{ top: '39%', left: '29%' }}>
          <circle cx="50" cy="50" r="20" />
        </svg>
      </Link>

      <Link to="/floor">
        <svg className="highlight" style={{ top: '47%', left: '17%' }}>
          <circle cx="50" cy="50" r="20" />
        </svg>
      </Link>

      <Link to="/floor">
        <svg className="highlight" style={{ top: '49.5%', left: '35%' }}>
          <circle cx="50" cy="50" r="20" />
        </svg>
      </Link>
    </div>
  );
};

export default Building;
