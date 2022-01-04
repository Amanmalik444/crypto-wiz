import Khaby from "Components/Mansions/Khaby";
import Dashboard from "Routes/Dashboard";

const DashPreview: React.FC = () => {
  if (!localStorage.getItem("jwt")) {
    return <Khaby />;
  } else {
    return <Dashboard />;
  }
};

export default DashPreview;
