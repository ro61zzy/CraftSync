interface StatsCardProps {
    title: string;
    value: string | number;
  }
  
  const StatsCard = ({ title, value }: StatsCardProps) => {
    return (
      <div className="border rounded-lg p-4 bg-white shadow-md">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  };
  
  export default StatsCard;
  