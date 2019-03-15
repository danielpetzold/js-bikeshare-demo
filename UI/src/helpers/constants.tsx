export const jasperServerUrl: string =
  'http://jrs-bikes-elasticl-1k5yhf91vrjuo-1806919984.us-east-2.elb.amazonaws.com/jasperserver-pro';

// Stub data. Best guess of data contract until input control is created.
export const filterData = {
  testRegions: [
    {
      name: 'San Francisco Bay Area',
      id: 'san_francisco_bay_area'
    },
    {
      name: 'Downtown San Francisco',
      id: 'downtown_san_francisco'
    },
    {
      name: 'South San Mateo County',
      id: 'south_san_mateo_county'
    },
    {
      name: 'Santa Clara County',
      id: 'santa_clara_county'
    }
  ],
  testTimeframe: [
    {
      name: 'Annual',
      id: 'annual'
    },
    {
      name: 'Last Quarter',
      id: 'last_quarter'
    },
    {
      name: 'Last Month',
      id: 'last_month'
    },
    {
      name: 'Last Week',
      id: 'last_week'
    },
    {
      name: 'Last 24 Hours',
      id: 'last_24_hours'
    },
    {
      name: 'Last 6 Hours',
      id: 'last_6_hours'
    }
  ]
};
