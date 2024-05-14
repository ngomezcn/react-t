export interface SaasReport {
    icon: string;
    title: string;
    value: string;
    badgeValue: string;
    color: 'success' | 'warning' | 'error' | 'info' | 'primary'; // Adjust based on your actual color options
    desc: string;
};

export interface MonthlyEarnings {
    id: string;
    jan?: number[];
    dec?: number[];
    nov?: number[];
    oct?: number[];
};

interface TopSellingData {
    name: string;
    desc: string;
    value: number;
}

export interface MonthlyTopSellingData {
    id: string;
    jan?: TopSellingData[];
    dec?: TopSellingData[];
    nov?: TopSellingData[];
    oct?: TopSellingData[];
}

export interface tasksDataType {
    id: number,
    task: string,
    assignedTo: string
}

export interface ChatMessage {
    id: number;
    name: string;
    msg: string;
    time: string;
    isSender: boolean;
}