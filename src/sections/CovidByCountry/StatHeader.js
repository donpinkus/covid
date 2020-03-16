import React from 'react';
import styled from 'styled-components';
import _ from "lodash";

import dateAndCountryDataRaw from "../../DateAndCountryData.json";

const S = {};

S.StatRow = styled.div`
  display: flex;
  justify-content: center;
`;

S.StatColumn = styled.div`
  margin-right: 30px;
`;

S.StatHeader = styled.div`
  font-weight: 600;
  font-size: 17px;
  width: 90px;
  text-align: right;
  margin-bottom: 10px;
`;

S.Stat = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

S.Number = styled.div`
  width: 90px;
  font-size: 20px;
  text-align: right;
  margin-right: 10px;
`;

S.Small = styled.div`
  font-size: 15px;
  font-weight: 300;
`;

const dateAndCountryData = dateAndCountryDataRaw.map(d => ({
  ...d,
  "date": new Date(d.date)
}));

const StatHeader = ({ selectedCountry }) => {
  const data = _.filter(dateAndCountryData, { location: selectedCountry });
  
  const d1 = data[data.length - 1];
  const d2 = data[data.length - 2];
  const d3 = data[data.length - 3];

  const cases = {
    total: d1.total_cases || 0,
    new: d1.new_cases || 0,
    change: d1.total_cases > 0 ? (d1.new_cases || 0) / d1.total_cases : 0
  };

  const deaths = {
    total: d1.total_deaths || 0,
    new: d1.new_deaths || 0,
    change: d1.total_deaths ? (d1.new_deaths || 0) / d1.total_deaths : 0
  };
  
  const mLag1 = Math.round(deaths.new / cases.new * 1000) / 10;
  const mLag2 = d2 ? Math.round(d2.new_deaths / d2.new_cases * 1000) / 10 : 0;

  const mortalityChangeNumeric = Math.round(Math.abs(mLag1 - mLag2) * 10) / 10;

  return (
    <S.StatRow>
      <S.StatColumn>
        <S.StatHeader>Cases</S.StatHeader>
        <S.Stat><S.Number>{cases.total.toLocaleString()}</S.Number> <S.Small>total</S.Small></S.Stat>
        <S.Stat><S.Number>{cases.new.toLocaleString()}</S.Number> <S.Small>new yesterday</S.Small></S.Stat>
        <S.Stat><S.Number>+{Math.round(cases.change * 100)}%</S.Number> <S.Small>per day</S.Small></S.Stat>
      </S.StatColumn>
      <S.StatColumn>
        <S.StatHeader>Deaths</S.StatHeader>
        <S.Stat><S.Number>{deaths.total.toLocaleString()}</S.Number> <S.Small>total</S.Small></S.Stat>
        <S.Stat><S.Number>{deaths.new.toLocaleString()}</S.Number> <S.Small>new yesterday</S.Small></S.Stat>
        <S.Stat><S.Number>+{Math.round(deaths.change * 100)}%</S.Number> <S.Small>per day</S.Small></S.Stat>
      </S.StatColumn>
      <S.StatColumn style={{ marginLeft: 20 }}>
        <S.StatHeader style={{ textAlign: 'left' }}>Mortality</S.StatHeader>
        {deaths.total > 0 && 
          <>
            <S.Stat><S.Number style={{ textAlign: 'left' }}>{Math.round(deaths.total / cases.total * 1000) / 10}%</S.Number></S.Stat>
            <div style={{ fontSize: 12, maxWidth: 220 }}>Mortality rate has <span style={{ fontWeight: 600 }}>{mLag1 > mLag2 ? "increased" : "decreased"} {mortalityChangeNumeric}%</span> since previous day</div>
          </>
        }
        {deaths.total == 0 && 
          <div>No deaths reported.</div>
        }
      </S.StatColumn>
    </S.StatRow>
  );
}

export default StatHeader;