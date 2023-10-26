import TitleCard from "../../../components/Cards/TitleCard";

const userSourceData = [
  { source: "Coal India", count: "45", conversionPercent: 10 },
  {
    source: "Bharat Coking Coal Limited (BCCL)",
    count: "21",
    conversionPercent: 18,
  },
  {
    source: "NLC India Limited (NLCIL)",
    count: "3",
    conversionPercent: "12",
  },
  {
    source: "Central Coalfields Limited (CCL)",
    count: "5",
    conversionPercent: 20,
  },
  {
    source: "Eastern Coal Fields Limited.",
    count: "10",
    conversionPercent: 15,
  },
];

function UserChannels() {
  return (
    <TitleCard title={"Monthly Order Chart"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Companies</th>
              <th className="normal-case">Orders Completed</th>
              <th className="normal-case">Orders pending</th>
            </tr>
          </thead>
          <tbody>
            {userSourceData.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.source}</td>
                  <td>{u.count}</td>
                  <td>{`${u.conversionPercent}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default UserChannels;
