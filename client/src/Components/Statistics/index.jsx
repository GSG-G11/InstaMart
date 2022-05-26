import React, {
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import QuickChart from 'quickchart-js';
import { Image } from 'cloudinary-react';

export default function Statistics() {
  const [statisticsUrl, setStatisticsUrl] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('/api/v1/admin/top5');
        if (result && result.data) {
          const myChart = new QuickChart();
          myChart.setConfig({
            type: 'pie',
            data: {
              labels: result.data.data.map(({ productName }) => productName),
              datasets: [{
                data: result.data.data.map(({ quantity }) => -quantity),
              }],
            },
          });

          setStatisticsUrl(myChart.getUrl());
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center',
    }}
    >
      <h2 style={{ marginBottom: '20px' }}>Top Sales Products</h2>
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center',
      }}
      >
        <Image
          cloudName="instamart"
          publicId={statisticsUrl}
          width="750"
          crop="scale"
        />
      </div>
    </div>
  );
}
