import { SERVER_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { DatePicker, Alert } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function Cal({ room, setClick, form }) {
  const [reservedDates, setReservedDates] = useState();
  const [isRender, setRender] = useState(false);
  const [selectedDates, setSelectedDates] = useState();
  const [newDisableDate, setExtraDisableDate] = useState({
    startDate: '',
    endDate: '',
    isExtraDisable: false,
  });

  useEffect(() => {
    const calLoading = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/bookings/booking/${room}`, {
          method: 'GET',
        });
        const res = await response.json();
        setReservedDates(res.map(d => Object.values(d).join('-')));
        setSelectedDates(null);
        setExtraDisableDate({
          startDate: '',
          endDate: '',
          isExtraDisable: false,
        });
        setRender(true);
      } catch (err) {
        console.log(err);
      }
    };

    calLoading();
  }, [room]);

  const disabledDate = current => {
    if (newDisableDate.isExtraDisable) {
      return (
        current < newDisableDate.startDate || current > newDisableDate.endDate
      );
    } else {
      return (
        current < dayjs().endOf('day') ||
        current > dayjs().add(6, 'month') ||
        reservedDates.some(x => current.isSame(x, 'day'))
      );
    }
  };

  const onCalendarChange = (dates, _, info) => {
    const priceLoading = async () => {
      try {
        //console.log(dates);
        const response = await fetch(
          `${SERVER_URL}/rooms/price/search?roomType=${room}&start=${dates[0].format(
            'YYYY-MM-DD'
          )}&end=${dates[1].add(-1, 'day').format('YYYY-MM-DD')}`,
          {
            method: 'GET',
          }
        );
        const res = await response.json();
        if (form) {
          console.log('___________', res[0].prices);
          const data = form.getFieldValue('data');
          form.setFieldsValue({
            data: { ...data, datesDetail: res[0].prices },
          });
        }
        const prices = res[0].prices.map(d => [
          Object.values(d.dates).join('-'),
          d.price,
        ]);
        const totalPrice = prices.reduce((acc, cur) => acc + +cur[1], 0);
        setClick({
          prices: prices,
          totalPrice: totalPrice,
          condClick: true,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (info.range === 'end' && dates === null) {
      setSelectedDates(null);
      if (form) {
        const data = form.getFieldValue('data');
        form.setFieldsValue({ data: { ...data, datesDetail: '' } });
      }
      setExtraDisableDate({
        startDate: '',
        endDate: '',
        isExtraDisable: false,
      });
      setClick({
        condClick: false,
      });
      return;
    }
    if (dates[0] != null && dates[1] != null) {
      //console.log(dates);
      priceLoading();
      setSelectedDates(dates);
      return setExtraDisableDate({
        startDate: dates[0],
        endDate: dates[1],
        isExtraDisable: true,
      });
    }
    if (info.range === 'end') {
      let startDisable = dayjs();
      reservedDates.forEach(d => {
        if (dates[1].isAfter(d, 'day') && startDisable.isBefore(d, 'day')) {
          startDisable = dayjs(d);
        }
      });
      setExtraDisableDate({
        startDate: startDisable,
        endDate: dates[1],
        isExtraDisable: true,
      });
    } else if (info.range === 'start') {
      let endDisable = dayjs().add(6, 'month');
      reservedDates.forEach(d => {
        if (dates[0].isBefore(d, 'day') && endDisable.isAfter(d, 'day')) {
          endDisable = dayjs(d);
        }
      });
      setExtraDisableDate({
        startDate: dates[0],
        endDate: endDisable,
        isExtraDisable: true,
      });
    }
    setSelectedDates(dates);
  };

  return isRender ? (
    <RangePicker
      disabledDate={disabledDate}
      onCalendarChange={onCalendarChange}
      value={selectedDates}
    />
  ) : (
    <Alert
      message="Sorry, we are not available to serve you right now. Please come back to us later."
      type="error"
      showIcon
    />
  );
}
