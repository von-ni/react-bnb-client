import React, { useState, useEffect } from "react";
import { SERVER_URL } from "../config";
import dayjs from "dayjs";

export default function Orders() {
  const [orderInfo, setOrdersInfo] = useState([]);
  const [isErrorMsg, setErrorMsg] = useState(false);
  useEffect(() => {
    const orderloading = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/bookings/member`, {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const res = await response.json();
        console.log(res);
        if (response.ok) {
          setOrdersInfo(res);
        } else if (response.status === 400) {
          setErrorMsg(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    orderloading();
  }, []);
  //console.log('___________orderInfo1____________', orderInfo);
  orderInfo.forEach((v) => {
    v.totalPrice = v.datesDetail.reduce((acc, cur) => acc + +cur.price, 0);
    const datesList = v.datesDetail.map((d) =>
      dayjs(new Date(+d.dates.year, +d.dates.month - 1, +d.dates.date))
    );
    //console.log('___________datesList____________', datesList);
    let min = datesList[0];
    let max = datesList[0];
    datesList.forEach((d) => {
      if (d.isBefore(min, "day")) {
        min = d;
      } else if (d.isAfter(max, "day")) {
        max = d;
      }
    });
    //console.log(min, max);
    v.checkIn = min.format("YYYY-MM-DD");
    v.checkOut = max.add(1, "day").format("YYYY-MM-DD");
  });
  //console.log('___________orderInfo2____________', orderInfo);
  return isErrorMsg ? (
    <div className="container">
      <h5 style={{ paddingTop: "50px" }}>Currently no bookings are made.</h5>
    </div>
  ) : (
    <div className="orders-container">
      <h1>Orders</h1>
      {orderInfo.map((v, i) => (
        <div key={i} className="order-container">
          <div>Check-in: {v.checkIn}</div>
          <div>Check-out:{v.checkOut}</div>
          <div>Total:{(v.totalPrice * 1.13).toFixed(2)} CAD</div>
        </div>
      ))}
    </div>
  );
}
