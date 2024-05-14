export interface SeriesDataPoint {
    name: string;
    data: number[];
}

export interface ChartData {
    id: number;
    title: string;
    price: string;
    perstangeValue: string;
    badgeColor: string;
    istrendingArrow?: boolean;
    seriesData: SeriesDataPoint[];
    color: string; // Assuming it's a string representing color values
}

export interface StatisticsData {
    company: number[];
    newJobs: number[];
    totalJobs: number[];
    jobView: number[];
}

export interface StatisticsApplication {
    id: number;
    data: StatisticsData;
}

export interface StatisticsSerias {
    name: string;
    type: string;
    data: StatisticsData;
}

export interface ChartOptions {
    chart: {
        height: number;
        type: string;
        stacked: boolean;
        toolbar: {
            show: boolean;
        };
    };
    legend: {
        show: boolean;
        offsetY: number;
    };
    stroke: {
        width: number[];
        curve: string;
    };
    plotOptions: {
        bar: {
            columnWidth: string;
        };
    };
    fill: {
        opacity: number[];
        gradient: {
            inverseColors: boolean;
            shade: string;
            type: string;
            opacityFrom: number;
            opacityTo: number;
            stops: number[];
        };
    };
    labels: string[];
    colors: string[];
    markers: {
        size: number;
    };
    xaxis: {
        type: string;
    };
    tooltip: {
        shared: boolean;
        intersect: boolean;
        y: {
            formatter: (y: any) => string;
        };
    };
}

export interface jobVacancyType {
    id: number,
    img: string,
    title: string,
    country: string,
    vacancy: number
}

export interface ReceivedTimeSeries {
    name: string;
    data: number[]
}

export interface LineChartOptions {
    chart: {
        type: string;
        height: number;
        toolbar: {
            show: boolean;
        };
    };
    stroke: {
        width: number;
        curve: string;
    };
    labels: string[];
    dataLabels: {
        enabled: boolean;
    };
    colors: string[];
    markers: {
        hover: {
            sizeOffset: number;
        };
    };
}

export interface FeedDataType {
    type: string,
    name?: string,
    action?: string,
    jobTitle?: string,
    timestamp: string,
    img?: string,
    accountType?: string,
    message?: string,
    actionLink?: string
}

export interface RecentJobsData {
    logo: string;
    jobTitle: string;
    company: string;
    postedTime: string;
    postedText: string;
}