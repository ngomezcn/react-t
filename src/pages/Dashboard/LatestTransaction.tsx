import React, { useState, useMemo, useCallback, useEffect } from "react";
import withRouter from "../../Components/Common/withRouter";

import { Badge, Button, Card, CardBody, CardTitle, } from "reactstrap";
import EcommerenceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

import TableContainer from "../../Components/Common/TableContainer";
import { getTransaction as onGetTransaction } from "slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from 'reselect';
import { LatestTransactions } from "./type";
import { Link } from "react-router-dom";

interface selectState {
  dashboard: {
    dashboardTransaction: LatestTransactions[];
    loading: boolean;
  };
};

const LatestTransaction: React.FC = () => {

  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: selectState) => state.dashboard,
    (dashboard) => ({
      latestTransaction: dashboard.dashboardTransaction
    })
  );

  const { latestTransaction } = useSelector(selectProperties);

  const [modal1, setModal1] = useState<boolean>(false);
  const [editDetails, setEditDetails] = useState<any>('');
  const toggleViewModal = useCallback((value: any) => { setModal1(!modal1); setEditDetails(value) }, [modal1]);

  const columns = useMemo(
    () => [
      {
        header: () => <input type="checkbox" className="form-check-input" />,
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },
      {
        header: "Order ID",
        accessorKey: "orderId",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return <Link to="#" className="text-body fw-bold">{cellProps.row.original.orderId}</Link>;
        },
      },
      {
        header: "Billing Name",
        accessorKey: "billingName",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Date",
        accessorKey: "orderDate",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Total",
        accessorKey: "total",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Payment Status",
        accessorKey: "paymentStatus",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return <Badge className={"font-size-11 badge-soft-" +
            (cellProps.row.original.paymentStatus === "Paid" ? "success" : "danger" && cellProps.row.original.paymentStatus === "Refund" ? "warning" : "danger")}
          >
            {cellProps.row.original.paymentStatus}
          </Badge>;
        },
      },
      {
        header: "Payment Method",
        accessorKey: "paymentMethod",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return <span>
            <i className={
              (cellProps.row.original.paymentMethod === "Paypal" ? "fab fa-cc-paypal me-1" : "" ||
                cellProps.row.original.paymentMethod === "COD" ? "fab fas fa-money-bill-alt me-1" : "" ||
                  cellProps.row.original.paymentMethod === "Mastercard" ? "fab fa-cc-mastercard me-1" : "" ||
                    cellProps.row.original.paymentMethod === "Visa" ? "fab fa-cc-visa me-1" : ""
              )}
            /> {cellProps.row.original.paymentMethod}
          </span>;
        },
      },
      {
        header: "View Details",
        accessorKey: "view",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <Button type="button" color="primary" className="btn-sm btn-rounded" onClick={() => toggleViewModal(cellProps.cell.row.original)}  > View Details </Button>
          );
        },
      },
    ],
    [toggleViewModal]
  );

  useEffect(() => {
    dispatch(onGetTransaction())
  }, [dispatch])


  return (
    <React.Fragment>
      <EcommerenceOrdersModal isOpen={modal1} toggle={toggleViewModal} editDetails={editDetails} />
      <Card>
        <CardBody>
          <CardTitle tag="h4" className="mb-4">Latest Transaction</CardTitle>
          <TableContainer
            columns={columns}
            data={latestTransaction}
            isGlobalFilter={false}
            tableClass="align-middle table-nowrap mb-0"
            theadClass="table-light"
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};


export default withRouter(LatestTransaction);
