import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Room = ({ image, alt, rooms }) => {
  return (
    <div className="image-map-container">
      <img src={image} alt={alt} className="image-map" />
      {rooms.map((room, index) => (
        <Link 
          key={index}
          to={room.link}
          className="room-rectangle"
          style={{
            top: room.position.top,
            left: room.position.left
          }}
        >
          <div className="rectangle-room-content">{room.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Room;