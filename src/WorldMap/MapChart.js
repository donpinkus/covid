import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import * as d3 from "d3";
import _ from "lodash";

import Geo from "./Geo.json";
import dateAndCountryDataRaw from "../DateAndCountryData.json";

/*
  NAME: "Afghanistan",
  NAME_LONG: "Afghanistan",
  ABBREV: "Afg.",
  FORMAL_EN: "Islamic State of Afghanistan",
  POP_EST: 34124811,
  POP_RANK: 15,
  GDP_MD_EST: 64080,
  POP_YEAR: 2017,
  GDP_YEAR: 2016,
  ISO_A2: "AF",
  ISO_A3: "AFG",
  CONTINENT: "Asia",
  REGION_UN: "Asia",
  SUBREGION: "Southern Asia"
*/
const CountryPropertiesFromGeo = Geo.objects.ne_110m_admin_0_countries.geometries.map(d => {
  return { ...d.properties }
});

const diseaseData = dateAndCountryDataRaw.map(d => {
  return {
    ...d,
    date: new Date(d),
  }
});

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const colorScale = d3.scaleLinear()
  .domain([0, 1])
  .range(["#ffedea", "#C70E20"]);

const MapChart = ({ setTooltipContent, onCountryClick }) => {
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={Geo}>
            {({ geographies }) =>
              geographies.map(geo => {
                console.log('geo', geo);
                
                
                const data = _.filter(diseaseData, { location: geo.properties.NAME_LONG });

                let growthRate = 0;
                if (data.length > 2 && data[data.length - 1].total_cases && data[data.length - 2].total_cases) {
                  growthRate = (data[data.length - 1].new_cases / data[data.length - 1].total_cases);
                }

                console.log('data', geo.properties.NAME, growthRate, data);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      onCountryClick(geo.properties.NAME_LONG);
                    }}
                    onMouseEnter={() => {
                      const { NAME_LONG } = geo.properties;
                      setTooltipContent({
                        name: NAME_LONG,
                        growthRate: growthRate
                      });
                    }}
                    onMouseLeave={() => {
                      setTooltipContent(null);
                    }}
                    style={{
                      default: {
                        fill: growthRate ? colorScale(growthRate) : "#F5F4F6",
                        stroke: "gray",
                        strokeWidth: "1px",
                        outline: "none"
                      },
                      hover: {
                        fill: growthRate ? colorScale(growthRate) : "#F5F4F6",
                        stroke: "black",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
