import { XYPlot, XAxis, YAxis, VerticalBarSeries } from "react-vis";

//Component to display Bar Chart
function BarChart() {
  const data = [
    { x: "0", y: 436.7028 },
    { x: "1", y: 1069.0875 },
    { x: "2", y: 1205.3389 },
    { x: "3", y: 1211.4529 },
    { x: "4", y: 1216.8755 },
    { x: "5", y: 1221.3872 },
    { x: "6", y: 1224.4266 },
    { x: "7", y: 1226.2313 },
    { x: "8", y: 1227.8884 },
    { x: "9", y: 1229.8357 },
    { x: "10", y: 1291.0104 },
  ];

  return (
    <div>
      <h4>Sunniness over roof area</h4>

      <XYPlot xType="ordinal" width={400} height={200}>
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={data} />
      </XYPlot>
    </div>
  );
}

export default BarChart;
