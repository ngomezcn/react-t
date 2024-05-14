import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Card, CardBody, CardTitle, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

import TableContainer from "../../../Components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { getWalletActivities as onGetWalletActivities } from "slices/thunk";
import { createSelector } from 'reselect';
import Spinners from "Components/Common/Spinner";
import { Link } from "react-router-dom";

const WalletActivities = ({ activeTab, toggleTab }: any) => {
  const dispatch = useDispatch<any>();

  const selectProperties = createSelector(
    (state: any) => state.crypto,
    (crypto) => ({
      WalletActivities: crypto.walletActivities,
      loading: crypto.loading
    })
  );

  const { WalletActivities, loading } = useSelector(selectProperties);
  const [isLoading, setLoading] = useState<boolean>(loading)

  const [currentPages, setCurrentPages] = useState<any>();

  useEffect(() => {
    dispatch(onGetWalletActivities())
  }, [dispatch]);

  useEffect(() => {
    setCurrentPages(WalletActivities)
  }, [WalletActivities])

  const columns = useMemo(
    () => [
      {
        header: "Id No",
        accessorKey: "idno",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return <Link to="#" className="text-body fw-bold">{cellProps.getValue()}</Link>
        },
      },
      {
        header: "Date",
        accessorKey: "pdate",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Type",
        accessorKey: "type",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Currency",
        accessorKey: "coin",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Amount in USD",
        accessorKey: "valueInUsd",
        enableColumnFilter: false,
        enableSorting: true,
      },
    ],
    []
  );

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4" className="mb-4">Activities</CardTitle>
        {
          isLoading ? <Spinners setLoading={setLoading} />
            :
            <>
              <Nav tabs className="nav-tabs-custom">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "1",
                    })}
                    onClick={() => {
                      toggleTab("1");
                      setCurrentPages(WalletActivities)
                    }}
                  >
                    All
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "2",
                    })}
                    onClick={() => {
                      toggleTab("2");
                      setCurrentPages(WalletActivities?.filter((data: any) => data.type === 'Buy'))
                    }}
                  >
                    Buy
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      toggleTab("3");
                      setCurrentPages(WalletActivities?.filter((data: any) => data.type === 'Sell'))
                    }}
                  >
                    Sell
                  </NavLink>
                </NavItem>
              </Nav>

              <div className="mt-4">
                <TableContainer
                  columns={columns}
                  data={currentPages || []}
                  isGlobalFilter={true}
                  isCustomPageSize={true}
                  isPagination={true}
                  SearchPlaceholder="search..."
                  tableClass="table-hover dt-responsive nowrap dataTable no-footer dtr-inline"
                  pagination="pagination pagination-rounded"
                />
              </div>
            </>
        }

      </CardBody >
    </Card >
  );
};

export default WalletActivities;
