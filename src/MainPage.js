import React from 'react';
import styled from 'styled-components';
import _ from "lodash";

import dateAndCountryDataRaw from "./DateAndCountryData.json";

import CovidByCountry from "./sections/CovidByCountry";

import WorldMap from "./WorldMap";
import LineChart from "./sections/World/LineChart";
import { Line } from 'react-simple-maps';

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
  padding: 30px 30px 0px;
  color: rgba(0,0,0,0.8);
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

S.SubTitle = styled.div`
  font-size: 17;
  font-weight: 600;
  text-align: center;
`;

S.Section = styled.div`
  margin: 60px auto 0;
  background: white;
  box-shadow: 0px 5px 8px rgba(0,0,0,0.02);
  border: 1px solid gainsboro;
  max-width: 1000px;
`;

const MainPage = () => {
  const country = window.location.pathname.length > 1 ? decodeURI(window.location.pathname.split("/")[1]) : "United States";

  console.log(country);
  const [selectedCountry, setSelectedCountry] = React.useState(country);

  React.useEffect(() => {
    window.history.pushState(null, null, `/${selectedCountry}`);
  }, [selectedCountry]);

  const onCountryChange = (countryName) => {
    setSelectedCountry(countryName);
  }

  return (
    <S.Page>
      <div style={{ fontSize: 30, textAlign: 'center', paddingTop: 60 }}>COVID-19 Summary</div>
      <S.AboutArticle>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div>The purpose of this report is to educate people, and give a realistic expectation of COVID-19 based on the latest data from the <S.Link href="#">World Health Organization</S.Link>.</div>
          <div style={{ fontSize: 14, marginTop: 20, opacity: 0.6 }}>Last updated Saturday March 14, 2020 at 12:00am</div>
        </div>
      </S.AboutArticle>

      <CovidByCountry onCountryChange={onCountryChange} selectedCountry={selectedCountry} />

      <S.Section>
        <div style={{ marginTop: 60 }} />

        <S.Center>
          <S.Title>Where is COVID-19 getting worse?</S.Title>
        </S.Center>

        <div style={{ marginTop: 20 }} />

        <S.SubTitle style={{ marginBottom: 10 }}>
          Countries where total cases are increasing
        </S.SubTitle>

        <div style={{ maxWidth: 800,  margin: "0 auto 0" }}>
          <WorldMap onCountryClick={(countryName) => { setSelectedCountry(countryName) }} />
        </div>

        <div style={{ marginTop: 40 }} />

        <div>
          <S.SubTitle>How quickly are total cases increasing?</S.SubTitle>
        </div>

        <LineChart />

      </S.Section>

      <div style={{ marginTop: 60 }} />

      <S.Footer>
        <div>
          All data is sourced directly from the World Health Organization, and is freely available <S.Link href="https://ourworldindata.org/coronavirus-source-data">here</S.Link>.
        </div>
        <br/>
        <div>
          This is a work in progress - all feedback or help is welcome. Contact me <S.Link href="mailto:don.pinkus@gmail.com">here</S.Link>.
        </div>
      </S.Footer>
    </S.Page>
  );
}

export default MainPage;
