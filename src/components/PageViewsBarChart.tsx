import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r},${g},${b},${a})`;

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    rgba(133, 118, 255, 1),
  ];
  return (
    <Card variant="outlined" sx={{ width: '100%', minHeight: '25.7em' }} className=''>
      <CardContent className='pt-5' style={{}}>
        <BarChart
          borderRadius={2}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              // categoryGapRatio: 0.5,
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
          ]}
          series={[
            {
              id: 'page-views',
              label: 'Page views',
              data: [2234, 3872, 2998, 4125, 3357, 2789, 2998, 2234, 3872, 2998, 4125, 3357],
              stack: 'A',
            },
            {
              id: 'downloads',
              label: 'Downloads',
              data: [3098, 4215, 2384, 2101, 4752, 3593, 2384, 2234, 3872, 2998, 4125, 3357],
              stack: 'A',
            },
            {
              id: 'conversions',
              label: 'Conversions',
              data: [4051, 2275, 3129, 4693, 3904, 2038, 2275, 2234, 3872, 2998, 4125, 3357],
              stack: 'A',
            },
          ]}
          height={300}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
