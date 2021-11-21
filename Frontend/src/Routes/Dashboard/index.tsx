import useData from "./data";
import ProfileCard from "./Components/ProfileCard";
import FavouriteList from "./Components/FavouriteList";

const Dashboard: React.FC = () => {
  const { states } = useData();

  const { favData, loading, followersNumber } = states;
  return (
    <div
      className="flex flex-col flex-wrap items-center justify-center
      w-full pt-20 pb-10 bg-gray-200"
    >
      <ProfileCard
        coinsSaved={favData?.length || 0}
        followersNumber={followersNumber}
      />
      <hr className="w-4/5 h-0.5 bg-gray-300 color-black my-2" />
      <FavouriteList data={favData || []} loading={loading} />
    </div>
  );
};

export default Dashboard;
