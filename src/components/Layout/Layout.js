import styled from "styled-components";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme === "dark" ? "#1a1a1a" : "#f8f9fa"};
  color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#333333")};
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: ${(props) => (props.sidebarOpen ? "250px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

const Layout = ({ children }) => {
  const { theme, sidebarOpen } = useSelector((state) => state.ui);
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  return (
    <LayoutContainer theme={theme}>
      <Header />
      {isAuthenticated && isAdmin && <Sidebar />}
      <MainContent sidebarOpen={sidebarOpen && isAuthenticated && isAdmin}>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
