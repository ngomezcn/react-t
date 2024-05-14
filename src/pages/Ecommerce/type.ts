export interface EcoAction {
    ecommerce: {
        products?: Product[];
        productDetail?: Product;
        orders?: ProductOrder[];
        answers?: Answer[];
        customers?: ProductCustomer[];
        shops?: EComShop[];
        productComments?: any[];
        cart?: cart[];
        loading?: boolean;
    }
}

export interface FilterClothes {
    id: number;
    name: string;
    link: string;
}

export interface Discount {
    label: string;
    value: number;
}

export interface Product {
    id: number;
    image: string;
    name: string;
    link: string;
    category: string;
    rating: number;
    oldPrice: number;
    newPrice: number;
    isOffer?: boolean;
    offer?: number;
    reviews: number;
    subImage: string[];
    specification: Specification[];
    features: Feature[];
    colorOptions: ColorOption[];
    recentProducts?: RecentProducts[];
    comments?: Comment[];
};


export interface Specification {
    type: string;
    value: string;
}

export interface Feature {
    icon: string;
    type: string;
    value: string;
}

export interface ColorOption {
    image: string;
    color: string;
}

export interface RecentProducts {
    id: number;
    img: string;
    name: string;
    link: string;
    rating: number;
    oldPrice: number;
    newPrice: number
}

export interface Comment {
    id: number;
    img: string;
    name: string;
    description: string;
    date: string;
    childComment?: Comment[];
}

export interface Answer {
    id: number;
    answer: string;
    correct: boolean;
}

export interface ProductOrder {
    id: number | string;
    orderId: string;
    billingName: string;
    orderDate: string;
    total: string;
    badgeClass: string;
    paymentStatus: string;
    methodIcon: string;
    paymentMethod: string;
}

export interface ProductCustomer {
    id: number;
    username: string;
    phone: string;
    email: string;
    address: string;
    rating: string;
    walletBalance: string;
    joiningDate: string;
};


export interface EComShop {
    id: number;
    color: string;
    name: string;
    product: number;
    balance: string;
    profileLink: string;
};

export interface cart {
    id: number;
    img: string;
    name: string;
    color: string;
    price: number;
    data_attr: number;
    total: number;
};


export interface OrderSummary {
    id: number;
    img: string;
    productTitle: string;
    price: number;
    qty: number;
}
