export interface UserMessages {
    id: number;
    to_id?: number;
    msg?: string;
    isSameTime?: boolean;
    images?: string;
    time?: number | string;
    isImages?: boolean;
}

export interface RecentChat {
    id: number;
    roomId: number;
    status: string;
    image?: string;
    isImg?: boolean;
    profile?: string;
    name: string;
    description?: string;
    time?: string;
}

export interface Group {
    id: number;
    roomId: number;
    image: string;
    name: string;
    status: string
}
export interface Contact {
    id: number;
    roomId: number;
    category: string;
    child: { id: number; roomId: number; name: string; status: string }[];
}

export interface Message {
    id: number;
    roomId: number;
    sender: string;
    message: string;
    isToday: string;
    time?: string;
    userMessages: UserMessages[]
}
export interface Chats {
    id?: number;
    name: string;
    roomId: number;
    status: string;
}