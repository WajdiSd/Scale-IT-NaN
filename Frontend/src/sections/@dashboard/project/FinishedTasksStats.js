import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from 'src/utils/formatNumber.js';
//
import BaseOptionChart from 'src/components/chart/BaseOptionChart.js';
import { useEffect } from 'react';
import { useDispatch } from 'src/redux/store'; 
import { getFinishedTasksInTimePourcentage, getFinishedTasksLatePourcentage } from 'src/redux/slices/performanceSlice';
import useWorkspace from 'src/hooks/useWorkspace';
import useProject from 'src/hooks/useProject';
import useAuth from 'src/hooks/useAuth';
import usePerformance from 'src/hooks/usePerformance';
import { useParams } from 'react-router';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------


export default function FinishedTasksStats() {
  const theme = useTheme();


  const dispatch = useDispatch();
  const {projectid} = useParams();
  console.log("*******************%%%%%%%%%%%%%%%%%%%%%%");
  console.log(projectid);
  //const projectId = projectid;
  const { user } = useAuth();
  const memberId = user?._id;

  useEffect(() => {
    dispatch(getFinishedTasksInTimePourcentage({projectid, memberId}));
    console.log("dispatching getFinishedTasksInTimePourcentage with", projectid, memberId);
    dispatch(getFinishedTasksLatePourcentage({projectid, memberId}));
  },[]);
  
  const { finishedTasksInTimePourcentage, finishedTasksLatePourcentage } = usePerformance();

  console.log("---------------------------------");
  console.log({ finishedTasksInTimePourcentage, finishedTasksLatePourcentage })
  const CHART_DATA = [finishedTasksInTimePourcentage, finishedTasksLatePourcentage];


  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.light,
      theme.palette.primary.dark,
    ],
    labels: ['in time', 'late'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (val) => fNumber(val),
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
            },
          },
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title="Finished tasks stats" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
