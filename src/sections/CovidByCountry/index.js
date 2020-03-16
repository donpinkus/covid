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

S.Section = styled.div`
  margin: 60px auto 0;
  background: white;
  box-shadow: 0px 5px 8px rgba(0,0,0,0.02);
  border: 1px solid gainsboro;
  max-width: 1000px;
`;

const dateAndCountryData = dateAndCountryDataRaw.map(d => ({
  ...d,
  "date": new Date(d.date)
}));

const CovidByCountry = ({ onCountryChange, selectedCountry }) => {  
  const data = _.filter(dateAndCountryData, { location: selectedCountry });
  const isDataAvailable = data.length > 0;

  return (
    <S.Section>
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

            <div style={{ marginTop: 60 }} />
            
            <CountryChart selectedCountry={selectedCountry} />
          </>
        }

      <div style={{ marginTop: 60 }} />
    </S.Section>
  );
}

export default CovidByCountry;