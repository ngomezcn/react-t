import React from 'react';
import { Badge } from 'reactstrap';

const Pdate = (cell: any) => {
    return cell.value ? cell.value : '';
};

const Type = (cell: any) => {
    return cell.value ? cell.value : '';
};

const Value = (cell: any) => {
    return cell.value ? cell.value : '';
};

const ValueinUSD = (cell: any) => {
    return cell.value ? cell.value : '';
};

const Status: any = (cell: any) => {
    switch (cell.value) {
        case "Completed":
            return <Badge color="success" className="font-size-10">Completed</Badge>
        case "Pending":
            return <Badge color="warning" className="font-size-10">Pending</Badge>
        case "Failed":
            return <Badge color="danger" className="font-size-10">Failed</Badge>
    }
};

const Coin = (cell: any) => {
    return cell.value ? cell.value : '';
};


export {
    Pdate,
    Type,
    Value,
    ValueinUSD,
    Status,
    Coin
};