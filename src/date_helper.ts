type NepaliYearData = {
  [nepaliYear: string]: {
    startOfYear: string;
    daysInMonths: [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
    ];
  };
};

export type NepaliDate = {
  year: number;
  month: number; // 1-12 (Baisakh = 1)
  day: number;
};

export const NEPALI_MONTHS = [
  "Baisakh",
  "Jestha",
  "Ashadh",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
] as const;

export const NEPALI_DAYS = [
  "Aaitabar",
  "Sombar",
  "Mangalbar",
  "Budhbar",
  "Bihibar",
  "Shukrabar",
  "Shanibar",
] as const;

export const NEPALI_CALENDAR_DATA: NepaliYearData = {
  "1970": {
    startOfYear: "1913-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1971": {
    startOfYear: "1914-04-13",
    daysInMonths: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  },
  "1972": {
    startOfYear: "1915-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  },
  "1973": {
    startOfYear: "1916-04-13",
    daysInMonths: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "1974": {
    startOfYear: "1917-04-13",
    daysInMonths: [31, 31, 32, 30, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1975": {
    startOfYear: "1918-04-12",
    daysInMonths: [31, 31, 32, 32, 30, 31, 30, 29, 30, 29, 30, 30],
  },
  "1976": {
    startOfYear: "1919-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "1977": {
    startOfYear: "1920-04-13",
    daysInMonths: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  },
  "1978": {
    startOfYear: "1921-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1979": {
    startOfYear: "1922-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "1980": {
    startOfYear: "1923-04-13",
    daysInMonths: [30, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "1981": {
    startOfYear: "1924-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  },
  "1982": {
    startOfYear: "1925-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1983": {
    startOfYear: "1926-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "1984": {
    startOfYear: "1927-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "1985": {
    startOfYear: "1928-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  },
  "1986": {
    startOfYear: "1929-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1987": {
    startOfYear: "1930-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "1988": {
    startOfYear: "1931-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "1989": {
    startOfYear: "1932-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1990": {
    startOfYear: "1933-04-13",
    daysInMonths: [30, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1991": {
    startOfYear: "1934-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "1992": {
    startOfYear: "1935-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30],
  },
  "1993": {
    startOfYear: "1936-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1994": {
    startOfYear: "1937-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1995": {
    startOfYear: "1938-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1996": {
    startOfYear: "1939-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1997": {
    startOfYear: "1940-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1998": {
    startOfYear: "1941-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "1999": {
    startOfYear: "1942-04-13",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2000": {
    startOfYear: "1943-04-14",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 29, 31],
  },
  "2001": {
    startOfYear: "1944-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2002": {
    startOfYear: "1945-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2003": {
    startOfYear: "1946-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2004": {
    startOfYear: "1947-04-14",
    daysInMonths: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2005": {
    startOfYear: "1948-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2006": {
    startOfYear: "1949-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2007": {
    startOfYear: "1950-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2008": {
    startOfYear: "1951-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  },
  "2009": {
    startOfYear: "1952-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2010": {
    startOfYear: "1953-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2011": {
    startOfYear: "1954-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2012": {
    startOfYear: "1955-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  },
  "2013": {
    startOfYear: "1956-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2014": {
    startOfYear: "1957-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2015": {
    startOfYear: "1958-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2016": {
    startOfYear: "1959-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  },
  "2017": {
    startOfYear: "1960-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2018": {
    startOfYear: "1961-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2019": {
    startOfYear: "1962-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2020": {
    startOfYear: "1963-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2021": {
    startOfYear: "1964-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2022": {
    startOfYear: "1965-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  },
  "2023": {
    startOfYear: "1966-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2024": {
    startOfYear: "1967-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2025": {
    startOfYear: "1968-04-13",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2026": {
    startOfYear: "1969-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2027": {
    startOfYear: "1970-04-14",
    daysInMonths: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2028": {
    startOfYear: "1971-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2029": {
    startOfYear: "1972-04-13",
    daysInMonths: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  },
  "2030": {
    startOfYear: "1973-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2031": {
    startOfYear: "1974-04-14",
    daysInMonths: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2032": {
    startOfYear: "1975-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2033": {
    startOfYear: "1976-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2034": {
    startOfYear: "1977-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2035": {
    startOfYear: "1978-04-14",
    daysInMonths: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  },
  "2036": {
    startOfYear: "1979-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2037": {
    startOfYear: "1980-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2038": {
    startOfYear: "1981-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2039": {
    startOfYear: "1982-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  },
  "2040": {
    startOfYear: "1983-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2041": {
    startOfYear: "1984-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2042": {
    startOfYear: "1985-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2043": {
    startOfYear: "1986-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  },
  "2044": {
    startOfYear: "1987-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2045": {
    startOfYear: "1988-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2046": {
    startOfYear: "1989-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2047": {
    startOfYear: "1990-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2048": {
    startOfYear: "1991-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2049": {
    startOfYear: "1992-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  },
  "2050": {
    startOfYear: "1993-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2051": {
    startOfYear: "1994-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2052": {
    startOfYear: "1995-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2053": {
    startOfYear: "1996-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  },
  "2054": {
    startOfYear: "1997-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2055": {
    startOfYear: "1998-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2056": {
    startOfYear: "1999-04-14",
    daysInMonths: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  },
  "2057": {
    startOfYear: "2000-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2058": {
    startOfYear: "2001-04-14",
    daysInMonths: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2059": {
    startOfYear: "2002-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2060": {
    startOfYear: "2003-04-14",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2061": {
    startOfYear: "2004-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2062": {
    startOfYear: "2005-04-14",
    daysInMonths: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  },
  "2063": {
    startOfYear: "2006-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2064": {
    startOfYear: "2007-04-14",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2065": {
    startOfYear: "2008-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2066": {
    startOfYear: "2009-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  },
  "2067": {
    startOfYear: "2010-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2068": {
    startOfYear: "2011-04-14",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2069": {
    startOfYear: "2012-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2070": {
    startOfYear: "2013-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  },
  "2071": {
    startOfYear: "2014-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2072": {
    startOfYear: "2015-04-14",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2073": {
    startOfYear: "2016-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  },
  "2074": {
    startOfYear: "2017-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2075": {
    startOfYear: "2018-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2076": {
    startOfYear: "2019-04-14",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  },
  "2077": {
    startOfYear: "2020-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2078": {
    startOfYear: "2021-04-14",
    daysInMonths: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2079": {
    startOfYear: "2022-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2080": {
    startOfYear: "2023-04-14",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  },
  "2081": {
    startOfYear: "2024-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  },
  "2082": {
    startOfYear: "2025-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2083": {
    startOfYear: "2026-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  },
  "2084": {
    startOfYear: "2027-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  },
  "2085": {
    startOfYear: "2028-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 31, 30, 30, 29, 30, 30, 30],
  },
  "2086": {
    startOfYear: "2029-04-14",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  },
  "2087": {
    startOfYear: "2030-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
  },
  "2088": {
    startOfYear: "2031-04-15",
    daysInMonths: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  },
  "2089": {
    startOfYear: "2032-04-14",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  },
  "2090": {
    startOfYear: "2033-04-14",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  },
  "2091": {
    startOfYear: "2034-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
  },
  "2092": {
    startOfYear: "2035-04-13",
    daysInMonths: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  },
  "2093": {
    startOfYear: "2036-04-14",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  },
  "2094": {
    startOfYear: "2037-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  },
  "2095": {
    startOfYear: "2038-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
  },
  "2096": {
    startOfYear: "2039-04-15",
    daysInMonths: [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  },
  "2097": {
    startOfYear: "2040-04-13",
    daysInMonths: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  },
  "2098": {
    startOfYear: "2041-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31],
  },
  "2099": {
    startOfYear: "2042-04-14",
    daysInMonths: [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30],
  },
  "2100": {
    startOfYear: "2043-04-14",
    daysInMonths: [31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30],
  },
};

export function englishToNepali(englishDate: Date): NepaliDate {
  // Find the appropriate Nepali year
  for (const nepaliYearStr of Object.keys(NEPALI_CALENDAR_DATA)) {
    const yearData = NEPALI_CALENDAR_DATA[nepaliYearStr];
    const startDate = new Date(yearData.startOfYear);

    // Calculate end date of the Nepali year
    const totalDaysInYear = yearData.daysInMonths.reduce(
      (sum, days) => sum + days,
      0,
    );
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + totalDaysInYear - 1);

    if (englishDate >= startDate && englishDate <= endDate) {
      // Found the correct year, now find month and day
      const daysDiff = Math.floor(
        (englishDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      let currentDay = daysDiff + 1; // +1 because we start from day 1
      let nepaliMonth = 1;

      for (const daysInMonth of yearData.daysInMonths) {
        if (currentDay <= daysInMonth) {
          return {
            year: parseInt(nepaliYearStr),
            month: nepaliMonth,
            day: currentDay,
          };
        }
        currentDay -= daysInMonth;
        nepaliMonth++;
      }
    }
  }

  throw new Error(
    `Unable to convert English date ${englishDate.toISOString()} to Nepali date`,
  );
}

export function nepaliToEnglish(nepaliDate: NepaliDate): Date {
  const yearData = NEPALI_CALENDAR_DATA[nepaliDate.year.toString()];
  if (!yearData) {
    throw new Error(`No data available for Nepali year ${nepaliDate.year}`);
  }

  const startDate = new Date(yearData.startOfYear);
  let daysToAdd = nepaliDate.day - 1; // -1 because we start from day 1

  // Add days for complete months
  for (let i = 0; i < nepaliDate.month - 1; i++) {
    daysToAdd += yearData.daysInMonths[i];
  }

  const resultDate = new Date(startDate);
  resultDate.setDate(startDate.getDate() + daysToAdd);
  return resultDate;
}

export function getCurrentNepaliDate(): NepaliDate {
  return englishToNepali(new Date());
}

export function parseNepaliDate(dateString: string): NepaliDate {
  if (!dateString.includes("-")) {
    throw new Error("Invalid date string format. Use YYYY-MM-DD");
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const nepaliDate = { year, month, day };

  if (!isValidNepaliDate(nepaliDate)) {
    throw new Error(`Invalid Nepali date: ${dateString}`);
  }

  return nepaliDate;
}

export function isValidNepaliDate(nepaliDate: NepaliDate): boolean {
  if (nepaliDate.month < 1 || nepaliDate.month > 12) return false;
  if (nepaliDate.day < 1) return false;

  const yearData = NEPALI_CALENDAR_DATA[nepaliDate.year.toString()];
  if (!yearData) return false;

  const daysInMonth = yearData.daysInMonths[nepaliDate.month - 1];
  return nepaliDate.day <= daysInMonth;
}

export function getDaysInMonth(year: number, month: number): number {
  const yearData = NEPALI_CALENDAR_DATA[year.toString()];
  if (!yearData || month < 1 || month > 12) {
    throw new Error(`Invalid year ${year} or month ${month}`);
  }
  return yearData.daysInMonths[month - 1];
}

export function getDaysInYear(year: number): number {
  const yearData = NEPALI_CALENDAR_DATA[year.toString()];
  if (!yearData) {
    throw new Error(`No data available for Nepali year ${year}`);
  }
  return yearData.daysInMonths.reduce((sum, days) => sum + days, 0);
}

export function formatNepaliDate(
  nepaliDate: NepaliDate,
  pattern: string,
): string {
  const patterns: { [key: string]: string } = {
    YYYY: nepaliDate.year.toString(),
    YY: nepaliDate.year.toString().slice(-2),
    MM: nepaliDate.month.toString().padStart(2, "0"),
    M: nepaliDate.month.toString(),
    MMMM: NEPALI_MONTHS[nepaliDate.month - 1],
    MMM: NEPALI_MONTHS[nepaliDate.month - 1].slice(0, 3),
    DD: nepaliDate.day.toString().padStart(2, "0"),
    D: nepaliDate.day.toString(),
    ddd: getNepaliDayName(nepaliDate),
    dd: getNepaliDayName(nepaliDate).slice(0, 3),
  };

  let formatted = pattern;
  Object.keys(patterns).forEach((key) => {
    const regex = new RegExp(key, "g");
    formatted = formatted.replace(regex, patterns[key]);
  });

  return formatted;
}

export function getNepaliDayName(nepaliDate: NepaliDate): string {
  const englishDate = nepaliToEnglish(nepaliDate);
  const dayIndex = englishDate.getDay();
  return NEPALI_DAYS[dayIndex];
}

export function addDays(nepaliDate: NepaliDate, days: number): NepaliDate {
  const englishDate = nepaliToEnglish(nepaliDate);
  englishDate.setDate(englishDate.getDate() + days);
  return englishToNepali(englishDate);
}

export function addMonths(nepaliDate: NepaliDate, months: number): NepaliDate {
  let newYear = nepaliDate.year;
  let newMonth = nepaliDate.month + months;

  while (newMonth > 12) {
    newMonth -= 12;
    newYear += 1;
  }

  while (newMonth < 1) {
    newMonth += 12;
    newYear -= 1;
  }

  // Adjust day if it exceeds days in the target month
  const daysInTargetMonth = getDaysInMonth(newYear, newMonth);
  const newDay = Math.min(nepaliDate.day, daysInTargetMonth);

  return { year: newYear, month: newMonth, day: newDay };
}

export function compareNepaliDates(
  date1: NepaliDate,
  date2: NepaliDate,
): number {
  if (date1.year !== date2.year) return date1.year - date2.year;
  if (date1.month !== date2.month) return date1.month - date2.month;
  return date1.day - date2.day;
}

export function isBefore(date1: NepaliDate, date2: NepaliDate): boolean {
  return compareNepaliDates(date1, date2) < 0;
}

export function isAfter(date1: NepaliDate, date2: NepaliDate): boolean {
  return compareNepaliDates(date1, date2) > 0;
}

export function isSame(date1: NepaliDate, date2: NepaliDate): boolean {
  return compareNepaliDates(date1, date2) === 0;
}

export function nepaliDateToString(nepaliDate: NepaliDate): string {
  return formatNepaliDate(nepaliDate, "YYYY-MM-DD");
}
