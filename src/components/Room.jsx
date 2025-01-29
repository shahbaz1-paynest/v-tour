import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

const Room = (props) => {
  const { roomName } = useParams();
  
  if (!props || !roomName || !props[roomName]) {
    return <div>Room not found</div>;
  }

  const room = props[roomName];

  return (
    <div className="image-map-container">
      <img src={room.image} alt={room.alt} className="image-map" />
      {room.rooms.map((room, index) => (
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