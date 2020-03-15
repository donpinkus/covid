import React from 'react';
import styled from 'styled-components';
import _ from "lodash";

import dateAndCountryDataRaw from "./DateAndCountryData.json";

import CovidByCountry from "./sections/CovidByCountry";

import WorldMap from "./WorldMap";

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
      <S.AboutArticle>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div>The purpose of this report is to educate people, and give a realistic expectation of COVID-19 based on the latest data from the <S.Link href="#">World Health Organization</S.Link>.</div>
          <div style={{ fontSize: 14, marginTop: 20, opacity: 0.6 }}>Last updated Saturday March 14, 2020 at 12:00am</div>
        </div>
      </S.AboutArticle>

      <CovidByCountry onCountryChange={onCountryChange} selectedCountry={selectedCountry} />

      <section>
        <div style={{ marginTop: 60 }} />

        <S.Center>
          <S.Title>Where is corona virus getting worse?</S.Title>
        </S.Center>

        <div style={{ maxWidth: 800, border: "1px solid rgba(0,0,0,0.1", margin: "20px auto 0" }}>
          <WorldMap onCountryClick={(countryName) => { setSelectedCountry(countryName) }} />
        </div>
      </section>

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
