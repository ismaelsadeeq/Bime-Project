import './chart.css'
import { DualAxes } from '@ant-design/plots';
import Box from '@mui/material/Box'

const DualAxesChart = ({data, values}) => {
  
  // const data = [
  //   {
  //     time: '2019-03',
  //     value: 350,
  //     count: 800,
  //   },
  //   {
  //     time: '2019-04',
  //     value: 900,
  //     count: 600,
  //   },
  //   {
  //     time: '2019-05',
  //     value: 300,
  //     count: 400,
  //   },
  //   {
  //     time: '2019-06',
  //     value: 450,
  //     count: 380,
  //   },
  //   {
  //     time: '2019-07',
  //     value: 470,
  //     count: 220,
  //   },
  // ];
  const config = {
    data: [data, data],
    xField: values[0],
    yField: [values[1], values[2]],
    geometryOptions: [
      {
        geometry: 'column',
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };
  return (
    <Box className="box-children" >
        <DualAxes {...config} />
    </Box>  
  )
};
export default DualAxesChart;
