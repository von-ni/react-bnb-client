import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cal from '../components/Cal';
import Guests from '../components/Guests';
import { Button } from 'antd';

export default function PriceSelector({ room, isBtn, form }) {
  //console.log(room, isBtn);
  const [isClick, setClick] = useState({
    condClick: false,
    prices: [],
    totalPrice: '',
  });

  return (
    <div>
      <Cal room={room} setClick={setClick} form={form} />
      <Guests form={form} />
      {isClick.condClick && (
        <>
          <div className="price-container">
            <span className="price">Total ${isClick.totalPrice} CAD</span> plus
            tax
          </div>
          <div className="price-details-container">
            {isClick.prices.map((v, i) => (
              <div className="price-details-row" key={i}>
                <span>{v[0]}</span>
                <span>${v[1]} per night</span>
              </div>
            ))}
          </div>
          {isBtn && (
            <div style={{ paddingTop: '20px' }}>
              <Link to="/book">
                <Button> Reserve </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
