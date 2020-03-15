import React from 'react';

import CountrySelect from "./CountrySelect";
import CountryTable from "./CountryTable";

import logo from './logo.svg';
import './App.css';

import styled from 'styled-components';

const FONT_COLORS = {
  light: '#4A4A4A'
}

const FONT_SIZES = {
  body: "17px",
  large: "30px",
}

const S = {};

S.App = styled.div`

`;

S.Page = styled.div`
  padding: 60px 30px;
`;

S.TopSearch = styled.div`
  padding: 15px;
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
  max-width: 800px;
  margin: 10px auto 0;
  color: ${FONT_COLORS.light};
  text-align: center;
  line-height: 28px;
`;

const App = () => {
  const [selectedCountry, setSelectedCountry] = React.useState(null);

  return (
    <S.Page>
      <S.TopSearch>
        <S.Title>How bad is corona virus in</S.Title> <CountrySelect />
      </S.TopSearch>

      <S.AboutArticle>
        The purpose of this report is to educate people, and give a realistic expectation of COVID-19 based on the latest data from the World Health Organization.
      </S.AboutArticle>

      <div style={{ marginTop: 60 }} />

      <StatHeader />

      <div style={{ marginTop: 60 }} />
      
      <CountryChart />

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
  align-items: flex-end;
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

const StatHeader = () => {
  return (
    <S.StatRow>
      <S.StatColumn>
        <S.StatHeader>Cases</S.StatHeader>
        <S.Stat><S.Number>483</S.Number> <S.Small>total</S.Small></S.Stat>
        <S.Stat><S.Number>28</S.Number> <S.Small>new yesterday</S.Small></S.Stat>
        <S.Stat><S.Number>+13%</S.Number> <S.Small>per day</S.Small></S.Stat>
      </S.StatColumn>
      <S.StatColumn>
        <S.StatHeader>Deaths</S.StatHeader>
        <S.Stat><S.Number>483</S.Number> <S.Small>total</S.Small></S.Stat>
        <S.Stat><S.Number>28</S.Number> <S.Small>new yesterday</S.Small></S.Stat>
        <S.Stat><S.Number>+13%</S.Number> <S.Small>per day</S.Small></S.Stat>
      </S.StatColumn>
      <S.StatColumn style={{ marginLeft: 20 }}>
        <S.StatHeader style={{ textAlign: 'left' }}>Mortality</S.StatHeader>
        <S.Stat><S.Number style={{ textAlign: 'left' }}>1.5%</S.Number></S.Stat>
        <div style={{ fontSize: 12, maxWidth: 150 }}><span style={{ fontWeight: 600 }}>3% increase</span> in mortality since previous day </div>
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
`;

S.Bar = styled.div`
  flex: 1;
  margin-right: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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

const CountryChart = () => {
  return (
    <S.Chart>
      <S.Bars>
        <S.Bar date={1}>
          <S.CaseBar style={{ height: "5%" }} />
          <S.DeathBar style={{ height: "1%" }} />
        </S.Bar>
        <S.Bar date={1}>
          <S.CaseBar style={{ height: "10%" }} />
          <S.DeathBar style={{ height: "3%" }} />
        </S.Bar>
        <S.Bar date={1}>
          <S.CaseBar style={{ height: "20%" }} />
          <S.DeathBar style={{ height: "5%" }} />
        </S.Bar>
        <S.Bar date={1}>
          <S.CaseBar style={{ height: "40%" }} />
          <S.DeathBar style={{ height: "5%" }} />
        </S.Bar>
        <S.Bar date={1}>
          <S.CaseBar style={{ height: "80%" }} />
          <S.DeathBar style={{ height: "20%" }} />
        </S.Bar>
      </S.Bars>
      <S.XAxis>
        <div>Mar 1</div>
        <div>Today</div>
      </S.XAxis>
    </S.Chart>
  )
}

export default App;
