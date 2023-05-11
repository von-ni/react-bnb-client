import React from 'react';
import { useParams } from 'react-router-dom';
import { roomType } from '../data-room';
import SliderGallery from '../components/SliderGallery';
import PriceSelector from '../components/PriceSelector';

export default function Room() {
  let { room } = useParams();
  const val = roomType.find(x => x.name === room);

  return (
    <div id="room">
      <h1>{room}</h1>
      <SliderGallery val={val} />
      <div className="container">
        <div className="container-left">
          <h2>About</h2>
          <hr />
          <div className="container-text">{val.about}</div>
        </div>
        <div className="container-right">
          <h6>View prices for your travel dates</h6>
          <PriceSelector room={room} isBtn="ture" />
        </div>
      </div>
    </div>
  );
}
