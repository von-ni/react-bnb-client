import React from 'react';
import { InputNumber } from 'antd';
import Grid from '@mui/material/Grid';

export default function Guests({ form }) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <p>Adults</p>
          <InputNumber
            name="adults"
            min={1}
            max={2}
            defaultValue={0}
            onChange={v => {
              if (form) {
                const data = form.getFieldValue('data');
                form.setFieldsValue({ data: { ...data, adults: v } });
              }
              //console.log(form.getFieldValue('data'));
            }}
          />
        </Grid>
        <Grid item>
          <p>Children</p>
          <InputNumber
            name="children"
            min={0}
            max={1}
            defaultValue={0}
            onChange={v => {
              if (form) {
                const data = form.getFieldValue('data');
                form.setFieldsValue({ data: { ...data, children: v } });
              }
            }}
          />
        </Grid>
        <Grid item>
          <p>Infant</p>
          <InputNumber
            name="infant"
            min={0}
            max={1}
            defaultValue={0}
            onChange={v => {
              if (form) {
                const data = form.getFieldValue('data');
                form.setFieldsValue({ data: { ...data, infant: v } });
              }
            }}
          />
        </Grid>
      </Grid>
      <div></div>
    </div>
  );
}
