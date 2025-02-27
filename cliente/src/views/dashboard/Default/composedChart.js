import React from 'react';
import { useTheme } from '@mui/material/styles';

import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
  
  export default function BarChart({colorBarra, data, title}) {

    let fixedData = [];
    for(let d of data){
      fixedData.push({
        name : d.category.charAt(0).toUpperCase() + d.category.slice(1),
        denuncias: d.value
      })
    }

    



    return (
      <ComposedChart
        
        width={350}
        height={238}
        data={fixedData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 0
        }}
        

      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} label={{ value: title, position: 'insideBottomRight', offset: 0 }}/>
        <YAxis />
        <Tooltip  />
        <Legend />
        <Bar dataKey="denuncias" barSize={5} fill={colorBarra} />
      </ComposedChart>
    );
  }

  //label={{ fill: 'red', fontSize: 20 }}