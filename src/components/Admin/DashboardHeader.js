import { Header, Title } from "./styles";
import { Button } from "../UI/Button";

const DashboardHeader = ({ onAddSite }) => {
  return (
    <Header>
      <Title>Admin Dashboard</Title>
      <Button variant="primary" onClick={onAddSite}>
        Add New Site
      </Button>
    </Header>
  );
};

export default DashboardHeader;
