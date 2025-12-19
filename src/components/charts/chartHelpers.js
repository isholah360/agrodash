// utils/chartUtils.js
export const groupByCommodity = (data) => {
  const map = {};
  data.forEach((d) => {
    map[d.commodity] = (map[d.commodity] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
};

export const groupByEnterprise = (data) => {
  const map = {};
  data.forEach((d) => {
    map[d.enterprise] = (map[d.enterprise] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
};

export const groupByCommodityForEnterprise = (data, enterprise) => {
  const map = {};
  data
    .filter((d) => d.enterprise === enterprise)
    .forEach((d) => {
      map[d.commodity] = (map[d.commodity] || 0) + 1;
    });

  return Object.entries(map).map(([name, value]) => ({ name, value }));
};


export const stackEnterpriseCommodity = (data) => {
  const map = {};

  data.forEach((d) => {
    if (!map[d.commodity]) {
      map[d.commodity] = {
        commodity: d.commodity,
        CROP: 0,
        AGRO_ALLIED: 0,
        LIVESTOCK: 0,
      };
    }
    map[d.commodity][d.enterprise]++;
  });

  return Object.values(map);
};

export const enterpriseTrend = (data) => {
  const map = {};
  data.forEach((d) => {
    map[d.enterprise] = (map[d.enterprise] || 0) + 1;
  });

  return Object.entries(map).map(([enterprise, count]) => ({
    enterprise,
    count,
  }));
};

