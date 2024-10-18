import StatsCard from "./components/StatsCard";

const OverviewPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-3 gap-6">
        <StatsCard title="Total Projects" value={12} />
        <StatsCard title="Active Tasks" value={8} />
        <StatsCard title="Pending Tasks" value={3} />
      </div>
    </div>
  );
};

export default OverviewPage;
