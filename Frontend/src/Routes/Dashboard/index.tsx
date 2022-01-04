import useData from "./data";
import ProfileCard from "Routes/Dashboard/Components/ProfileCard";
import FavouriteList from "Routes/Dashboard/Components/FavouriteList";

const Dashboard: React.FC = () => {
  const {
    states,
    onProfilePicClick,
    setConnectModalVisibility,
    setProfilePicsModalVisibility,
    setDefaultTab,
  } = useData();

  const {
    favData,
    loading,
    followersNumber,
    connectModalVisibile,
    profilePicsModalVisibile,
    defaultTab,
    user,
  } = states;
  return (
    <div
      className="flex flex-col flex-wrap items-center justify-center
      w-full pt-20 pb-10 bg-gray-200"
    >
      <ProfileCard
        user={user}
        coinsSaved={favData?.length || 0}
        followersNumber={followersNumber}
        onProfilePicClick={onProfilePicClick}
        connectModalVisibile={connectModalVisibile}
        setConnectModalVisibility={setConnectModalVisibility}
        profilePicsModalVisibile={profilePicsModalVisibile}
        setProfilePicsModalVisibility={setProfilePicsModalVisibility}
        defaultTab={defaultTab}
        setDefaultTab={setDefaultTab}
      />
      <hr className="w-4/5 h-0.5 bg-gray-300 color-black my-2" />
      <FavouriteList data={favData || []} loading={loading} />
    </div>
  );
};

export default Dashboard;
