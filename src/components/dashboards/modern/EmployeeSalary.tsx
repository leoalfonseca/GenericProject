import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';

import DashboardWidgetCard from '../../shared/DashboardWidgetCard';

const EmployeeSalary = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.grey[100];

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 280,
    },
    colors: [
      primarylight,
      primarylight,
      primary,
      primarylight,
      primarylight,
      primarylight,
    ],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '45%',
        distributed: true,
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: [['Abr'], ['Mai'], ['Jun'], ['Jul'], ['Ago'], ['Set']],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      data: [20, 15, 30, 25, 10, 15],
    },
  ];

  return (
    <DashboardWidgetCard
      title="Salário dos Funcionários"
      subtitle="Todo mês"
      dataLabel1="Salário"
      dataItem1="R$36.358"
      dataLabel2="Lucro"
      dataItem2="R$5.296"
    >
      <>
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height={280}
          width={'100%'}
        />
      </>
    </DashboardWidgetCard>
  );
};

export default EmployeeSalary;
