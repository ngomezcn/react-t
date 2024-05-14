import React from "react";
import { Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";

const WalletOverView = ({ wallet }: any) => {
  const options: any = {
    chart: { toolbar: { show: !1 } },
    dataLabels: { enabled: !1 },
    stroke: { curve: "smooth", width: 2, dashArray: [0, 0, 3] },
    fill: { type: "solid", opacity: [0.15, 0.05, 1] },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: ["#f1b44c", "#556ee6", "#50a5f1"],
  }

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-3">Overview</h4>
        <div>
          <div id="overview-chart" dir="ltr">
            <ReactApexChart
              series={wallet.series.length ? wallet.series : {}}
              options={options}
              type="line"
              height={240}
              className="apex-charts"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WalletOverView;
