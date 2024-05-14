export interface ChartOptions {
    chart: {
        sparkline: {
            enabled: boolean;
        };
    };
    stroke: {
        curve: string;
        width: number;
    };
    colors: string[];
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
    tooltip: {
        fixed: {
            enabled: boolean;
        };
        x: {
            show: boolean;
        };
        marker: {
            show: boolean;
        };
    };
}

interface series {
    name: string;
    data: number[];
}

export interface cryptoReport {
    title: string;
    icon: string;
    color: string;
    value: string;
    desc: string;
    series: series[];
    options: ChartOptions | any;
    arrowUpDown: string;
}

export interface DashboardCryptoData {
    id: number,
    series: number[],
    availablebalance: number,
    income: number,
    Expense: number,
    Ethereum: {
        ETH: number,
        Dollar: number,
    },
    Bitcoin: {
        BTC: number,
        Dollar: number,
    },
    Litecoin: {
        LTC: number,
        Dollar: number,
    }
}

export interface WalletOptions {
    plotOptions: {
        radialBar: {
            offsetY: number;
            startAngle: number;
            endAngle: number;
            hollow: {
                margin: number;
                size: string;
                background: string;
                image: undefined;
            };
            track: {
                show: boolean;
                startAngle: undefined;
                endAngle: undefined;
                background: string;
                strokeWidth: string;
                opacity: number;
                margin: number;
                dropShadow: {
                    enabled: boolean;
                    top: number;
                    left: number;
                    blur: number;
                    opacity: number;
                };
            };
            dataLabels: {
                name: {
                    show: boolean;
                    fontSize: string;
                    fontWeight: number;
                    offsetY: number;
                };
                value: {
                    show: boolean;
                    fontSize: string;
                    offsetY: number;
                    formatter: (e: any) => string | any;
                };
                total: {
                    show: boolean;
                    label: string;
                    color: string;
                    fontSize: string;
                    fontFamily: undefined;
                    fontWeight: number;
                    formatter: (e: any) => string | any;
                };
            };
        };
    };
    stroke: {
        lineCap: string;
    };
    colors: string[];
    labels: string[];
    legend: {
        show: boolean;
    };
}

export interface OverviewChartOptions {
    chart: {
        toolbar: "false"; // Assuming toolbar is expected to be a string with the value "false"
    };
    dataLabels: {
        enabled: false;
    };
    stroke: {
        curve: "smooth";
        width: 2;
    };
    markers: {
        size: 0;
        style: "hollow";
    };
    xaxis: {
        type: "datetime";
        min: number; // Assuming min is expected to be a timestamp
        tickAmount: number;
    };
    tooltip: {
        x: {
            format: "dd MMM yyyy";
        };
    };
    colors: string[]; // Assuming overViewChartColors is an array of strings
    fill: {
        type: "gradient";
        gradient: {
            shadeIntensity: 1;
            opacityFrom: 0.6;
            opacityTo: 0.05;
            stops: number[];
        };
    };
}

export interface TransactionsType {
    id: number,
    icon: string,
    color: string,
    type: string,
    currency: string,
    date: string,
    amount: string,
    price: string
}

export interface Notification{
    id: number,
    avatar: string,
    title: string,
    description: string,
    author: string,
    date: string
}