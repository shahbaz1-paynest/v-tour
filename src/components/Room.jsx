import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Room = () => {
  const rooms = [
    {
      name: 'Bedroom',
      position: { top: '45%', left: '60%' },
      link: '/panorama'
    },
    {
      name: 'Kitchen',
      position: { top: '60%', left: '39%' },
      link: '/panorama'
    },
    {
      name: 'Living Room',
      position: { top: '50%', left: '40%' },
      link: '/panorama'
    },
    {
      name: 'Dining Room',
      position: { top: '50%', left: '50%' },
      link: '/panorama'
    }
  ];

  return (
    <div className="image-map-container">
      <img
        src="/room.webp"
        alt="Room Map"
        className="image-map"
      />

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