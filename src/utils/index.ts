import { ApexOptions } from 'apexcharts';

export const getDaysFromNow = (targetDate: Date) => {
  const now = new Date();
  const deltaT = targetDate.getTime() - now.getTime();
  return Math.round(deltaT / (1000 * 3600 * 24));
};

export const generateChartOptionsSeries = (
  chartId: string,
  data: { date: Date; value: number }[],
  seriesName: string
): {
  options: ApexOptions;
  series: ApexAxisChartSeries;
} => ({
  options: {
    chart: {
      type: 'area',
      sparkline: {
        enabled: true,
      },
      id: chartId,
      toolbar: {
        show: false,
      },
      fontFamily: 'VazirMatn',
    },
    xaxis: {
      categories: data.map((x) => new Date(x.date).toLocaleDateString('fa-IR')),
      offsetY: 50,
      offsetX: -40,
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#019990'],
    fill: {
      opacity: 0.3,
    },
    tooltip: {
      theme: 'dark',
    },
    yaxis: {
      // min: 0,
      show: false,
    },
  },
  series: [
    {
      data: data.map((x) => x.value),
      name: seriesName,
    },
  ],
});

export const uploadTextPdfFileFilter = (file: FileList) => {
  console.log(file);
  return [];
};

export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
