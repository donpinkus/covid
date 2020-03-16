import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import _ from "lodash";

import dateAndCountryDataRaw from "../../DateAndCountryData.json";

const dateAndCountryData = dateAndCountryDataRaw.map(d => ({
  ...d,
  "date": new Date(d.date)
}));

const diseaseData = _.groupBy(dateAndCountryData, 'date');

console.log(diseaseData);

let diseaseDataByDate = [];
let locations = [];

for (let date in diseaseData) {
  const datum = {
    date
  };
  
  diseaseData[date].forEach(locationD => {
    if (locationD.new_cases > 0 && locationD.location !== 'World') {
      // add to locations
      locations.indexOf(locationD.location) && locations.push(locationD.location);
      // add to series data
      datum[locationD.location] = locationD.new_cases;
    }
  });

  diseaseDataByDate.push(datum);
}

console.log(diseaseDataByDate);

diseaseDataByDate = _.sortBy(diseaseDataByDate, d => new Date(d.date).getTime());

console.log(diseaseDataByDate);

const SimpleLineChart = () => {
  return <div>hi</div>;
  
  return (
    <LineChart 
      width={600} 
      height={600} 
      data={diseaseDataByDate}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="date"/>
      <YAxis type="number" domain={[0, 5000]} />
      <CartesianGrid strokeDasharray="3 3"/>
      {
        locations.map(location => {
          if (location !== 'date' && location !== 'world') {
            return <Line type="monotone" dataKey={location} stroke="#82ca9d" dot={false} />;
          }
        })
      }
    </LineChart>
  );
};

export default SimpleLineChart;
