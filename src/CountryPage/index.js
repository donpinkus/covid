import React from 'react';
import styled from 'styled-components';
import _ from "lodash";

import dateAndCountryDataRaw from "../DateAndCountryData.json";

import CountrySelect from "./CountrySelect";
import WorldMap from "../WorldMap";

const dateAndCountryData = dateAndCountryDataRaw.map(d => ({
  ...d,
  "date": new Date(d.date)
}));

const FONT_COLORS = {
  light: '#4A4A4A'
}

const FONT_SIZES = {
  body: "17px",
  large: "30px",
}

const S = {};

S.Page = styled.div`
`;

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

S.AboutArticle = styled.div`
  font-size: 20px;
  font-weight: 300;
  color: ${FONT_COLORS.light};
  text-align: center;
  line-height: 28px;
  padding: 60px 30px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  background: #262626;
  color: white;
`;

S.Footer = styled.div`
  background: #262626;
  padding: 60px 30px;
  color: rgba(255,255,255,0.8);
  text-align: center;
`;

S.Link = styled.a`
  text-decoration: none;
  color: #44adec;
`;

const CountryPage = () => {
  const [selectedCountry, setSelectedCountry] = React.useState("United States");

  const onCountryChange = (countryName) => {
    setSelectedCountry(countryName);
  }

  console.log(selectedCountry);

  const data = _.filter(dateAndCountryData, { location: selectedCountry });
  const isDataAvailable = data.length > 0;

  return (
    <S.Page>
      <S.AboutArticle>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div>The purpose of this report is to educate people, and give a realistic expectation of COVID-19 based on the latest data from the <S.Link href="#">World Health Organization</S.Link>.</div>
          <div style={{ fontSize: 14, marginTop: 20, opacity: 0.6 }}>Last updated Saturday March 14, 2020 at 12:00am</div>
        </div>
      </S.AboutArticle>

      <section style={{ borderBottom: "1px solid rgba(0,0,0,0.15)" }}>
        <div style={{ marginTop: 60 }} />
          <S.Center>
            <S.Title>COVID-19 statistics in </S.Title> <CountrySelect onChange={onCountryChange} />
          </S.Center>

          <div style={{ marginTop: 60 }} />

          {selectedCountry && !isDataAvailable &&
            <div style={{ textAlign: 'center', fontWeight: 600 }}>{selectedCountry} has not reported any cases of COVID-19.</div>
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

      <section>
        <div style={{ marginTop: 60 }} />

        <S.Center>
          <S.Title>Where is corona virus getting worse?</S.Title>
        </S.Center>

        <div style={{ maxWidth: 800, border: "1px solid rgba(0,0,0,0.1", margin: "20px auto 0" }}>
          <WorldMap />
        </div>
      </section>

      <div style={{ marginTop: 60 }} />

      <S.Footer>
        <div>
          All data is sourced directly from the World Health Organization, and is freely available <S.Link href="https://ourworldindata.org/coronavirus-source-data">here</S.Link>.
        </div>
        <br/>
        <div>
          This is a work in progress - all feedback or help is welcome.
        </div>
        <br/>
        <div>
          Contact me at don.pinkus@gmail.com or <S.Link href="https://twitter.com/whatsdonisdon">here</S.Link>.
        </div>
      </S.Footer>
    </S.Page>
  );
}

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
  font-size: ${FONT_SIZES.large};
  text-align: right;
  margin-right: 10px;
`;

S.Small = styled.div`
  font-size: ${FONT_SIZES.body};
  font-weight: 300;
`;

const StatHeader = ({ selectedCountry }) => {
  const data = _.filter(dateAndCountryData, { location: selectedCountry });
  
  const d1 = data[data.length - 1];
  const d2 = data[data.length - 2];
  const d3 = data[data.length - 3];
  console.log(data);

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

  console.log(mLag1, mLag2);

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
            <S.Stat><S.Number style={{ textAlign: 'left' }}>{mLag1}%</S.Number></S.Stat>
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

export default CountryPage;
