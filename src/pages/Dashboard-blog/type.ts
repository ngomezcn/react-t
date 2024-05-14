export interface blogStatsDataType {
    title: string,
    value: string,
    icon: string
}

export interface ChartOptions {
    chart: {
        height: number;
        type: string;
        toolbar: {
            show: boolean;
        };
    };
    colors: string[];
    dataLabels: {
        enabled: boolean;
    };
    stroke: {
        curve: string;
        width: number;
    };
    fill: {
        type: string;
        gradient: {
            shadeIntensity: number;
            inverseColors: boolean;
            opacityFrom: number;
            opacityTo: number;
            stops: number[];
        };
    };
    xaxis: {
        categories: string[];
    };
    markers: {
        size: number;
        strokeWidth: number;
        hover: {
            size: number;
            sizeOffset: number;
        };
    };
    legend: {
        position: string;
        horizontalAlign: string;
    };
}

export interface VisitorsType {
    id: number,
    data: {
        categories: string[],
        CurrentData: number[],
        PreviousData: number[],
    },
    today: number,
    thisMonth: number,
    thisYear: number
}


export interface RecentDataType {
    img: string,
    title: string,
    date: string
}

export interface PopularDataType {
    img: string,
    title: string,
    date: string,
    dropdownItems: string[]
}

export interface CommentsType {
    name: string,
    time: string,
    content: string,
    replies?: CommentsType[]
}

export interface ProgressType {
    id: number, color: string, label: string, percentage: number
}

export interface ActivityData {
    date: string,
    title: string,
    link?: string,
    boldText?: string;
    text?: string;
    linkText?: string;
    active?: boolean
}

export interface BlogPopularPost {
    id: number;
    img: string; // Assuming img is a string representing the image source
    title: string;
    date: string;
    like: string;
    comment: string;
}