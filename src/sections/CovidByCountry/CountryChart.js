import React from 'react';
import styled from 'styled-components';
import _ from "lodash";

import dateAndCountryDataRaw from "../../DateAndCountryData.json";

const dateAndCountryData = dateAndCountryDataRaw.map(d => ({
  ...d,
  "date": new Date(d.date)
}));

let S = {};

S.Chart = styled.div`
max-width: 500px;
margin: 0 auto;
`;

S.Bars = styled.div`
display: flex;
align-items: flex-end;
height: 200px;
border-bottom: 1px solid #e6e6e6;
`;

S.Bar = styled.div`
flex: 1;
margin-right: 2px;
height: 100%;
display: flex;
flex-direction: column;
justify-content: flex-end;
position: relative;

.Tooltip {
  position: absolute;
  padding: 15px;
  background: white;
  width: contain
  top: -30px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  width: 200px;
  background: #353640;
  border-radius: 3px;
  color: white;
  display: none;
  z-index: 2;
}

&:hover .Tooltip {
  display: block;
}
`;

S.DeathBar = styled.div`
width: 100%;
background: #D03545;
`;

S.CaseBar = styled.div`
width: 100%;
background: #282E38;
`;

S.XAxis = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
`;

const CountryChart = ({ selectedCountry }) => {
  const data = _.filter(dateAndCountryData, { location: selectedCountry });

  const latestD = data[data.length - 1];

  const maxCases = latestD.total_cases;

  return (
    <S.Chart>
      <S.Bars>
        {data.map(d => (
          <S.Bar key={d.date}>
            <S.CaseBar style={{ height: Math.round(d.total_cases / maxCases * 100) + "%" }} />
            <S.DeathBar style={{ height: Math.round(d.total_deaths / maxCases * 100) + "%" }} />
            <div className="Tooltip">
              <div>{d.new_deaths || 0} new deaths</div>
              <div>{d.new_cases || 0} new cases</div>
              <br/>
              <div>{d.total_deaths || 0} total deaths</div>
              <div>{d.total_cases || 0} total cases</div>
              <br/>
              <div>{Math.round((d.new_deaths || 0) / d.new_cases * 1000) / 10}% mortality rate</div>
            </div>
          </S.Bar>
        ))}
      </S.Bars>
      <S.XAxis>
        <div>Mar 1</div>
        <div>Today</div>
      </S.XAxis>
    </S.Chart>
  )
}

export default CountryChart;