import Khaby from "../../Components/Molecules/Khaby";
import Dashboard from "./dashboard";

const DashPreview: React.FC = () => {
  if (!localStorage.getItem("jwt")) {
    return <Khaby />;
  } else {
    return <Dashboard />;
  }
};

export default DashPreview;
