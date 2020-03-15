import React from 'react';
import styled from 'styled-components';
import _ from "lodash";

import dateAndCountryDataRaw from "../../DateAndCountryData.json";

import CountrySelect from "./CountrySelect";
import StatHeader from "./StatHeader";
import CountryChart from "./CountryChart";

let S = {};

S.Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

S.Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-right: 10px;
`;

const dateAndCountryData = dateAndCountryDataRaw.map(d => ({
  ...d,
  "date": new Date(d.date)
}));

const CovidByCountry = ({ onCountryChange, selectedCountry }) => {  
  const data = _.filter(dateAndCountryData, { location: selectedCountry });
  const isDataAvailable = data.length > 0;

  return (
    <section style={{ borderBottom: "1px solid rgba(0,0,0,0.15)" }}>
      <div style={{ marginTop: 60 }} />
        <S.Center>
          <S.Title>COVID-19 statistics in </S.Title> <CountrySelect onChange={onCountryChange} value={selectedCountry} />
        </S.Center>

        <div style={{ marginTop: 60 }} />

        {selectedCountry && !isDataAvailable &&
          <div style={{ textAlign: 'center', fontWeight: 600, height: 407, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{selectedCountry} has not reported any cases of COVID-19.</div>
        }
        {isDataAvailable && 
          <>
            <StatHeader selectedCountry={selectedCountry} />

            <div style={{ marginTop: 20 }} />
            
            <CountryChart selectedCountry={selectedCountry} />
          </>
        }

      <div style={{ marginTop: 60 }} />
    </section>
  );
}

export default CovidByCountry;