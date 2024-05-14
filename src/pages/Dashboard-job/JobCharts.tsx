import React from 'react';
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../Components/Common/ChartDynamicColor";
import { ChartOptions, LineChartOptions, ReceivedTimeSeries, StatisticsSerias } from './type';

const JobWidgetCharts = ({ dataColors, series }: any) => {
    var areacharteathereumColors = getChartColorsArray(dataColors);

    var options: any = {
        chart: {
            width: 130,
            height: 46,
            type: "area",
            sparkline: {
                enabled: true,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 1.5,
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [50, 100, 100, 100],
            },
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function (seriesName: any) {
                        return ''
                    }
                }
            },
            marker: {
                show: false
            }
        },
        colors: areacharteathereumColors,
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height="46"
                width="130"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const StatisticsApplicationsChart = ({ StatisticsSerias, dataColors }: any) => {

    var statisticsApplicationColors = getChartColorsArray(dataColors);

    const series: StatisticsSerias[] | any = [{
        name: 'Company',
        type: 'column',
        data: StatisticsSerias?.company || []
    }, {
        name: 'New Jobs',
        type: 'column',
        data: StatisticsSerias?.newJobs || []
    }, {
        name: 'Total Jobs',
        type: 'area',
        data: StatisticsSerias?.totalJobs || []
    }, {
        name: 'Job View',
        type: 'line',
        data: StatisticsSerias?.jobView || []
    }];

    var options: ChartOptions | any = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: true,
            offsetY: 10,
        },
        stroke: {
            width: [0, 0, 2, 2],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '30%'
            }
        },
        fill: {
            opacity: [1, 1, 0.1, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        labels: ['01/01/2022', '02/01/2022', '03/01/2022', '04/01/2022', '05/01/2022', '06/01/2022', '07/01/2022',
            '08/01/2022', '09/01/2022', '10/01/2022', '11/01/2022'
        ],
        colors: statisticsApplicationColors,
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime'
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y: any) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;

                }
            }
        }
    }
    return (
        <React.Fragment>
            <ReactApexChart options={options} series={series} type="line" height={350} className="apex-charts pb-3" />
        </React.Fragment>
    );
};

const ReceivedTimeCharts = ({ dataColors }: any) => {

    var ApplicationReviewedTimeColors = getChartColorsArray(dataColors);

    const series: ReceivedTimeSeries[] = [{
        name: 'Received Application',
        data: [34, 44, 54, 21, 12, 43, 33, 80, 66]
    }];

    var options: LineChartOptions | any = {
        chart: {
            type: 'line',
            height: 378,
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: 3,
            curve: 'smooth'
        },
        labels: ['8 PM', '9 PM', '10 PM', '11 PM', '12 PM', '1 AM', '2 AM',
            '3 AM', '4 AM'
        ],
        dataLabels: {
            enabled: false
        },
        colors: ApplicationReviewedTimeColors,
        markers: {
            hover: {
                sizeOffset: 4
            }
        }
    };

    return (
        <React.Fragment>
            <ReactApexChart options={options} series={series} type="line" height="378px" className="apex-charts" />
        </React.Fragment>
    );
};

export { JobWidgetCharts, StatisticsApplicationsChart, ReceivedTimeCharts };