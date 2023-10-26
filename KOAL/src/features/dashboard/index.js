import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import UserChannels from "./components/UserChannels";

import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";

import Maps from "./components/maps.js";

const statsData = [
  {
    title: "Total Coal",
    value: "350156.7kg",

    description: "↗︎ 2300 (22%)",
  },
  {
    title: "Total Sales",
    value: "₹90,34,545",

    description: "Current month",
  },
  {
    title: "Pending Deliveries",
    value: "9",

    description: "50 in hot leads",
  },
  {
    title: "Successful deliveries in the last 3 days",
    value: "5",

    description: "↑ 300 (18%)",
  },
];

function Dashboard() {
  const dispatch = useDispatch();

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/**-----------maps-------------     */}
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6 h-[500px]">
        <Maps />

        <div className="grid lg:grid-row-2 mt-6 grid-cols-1 gap-6">
          <PageStats />
          <AmountStats />
        </div>
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <UserChannels />
        <BarChart />
      </div>
    </>
  );
}

export default Dashboard;
