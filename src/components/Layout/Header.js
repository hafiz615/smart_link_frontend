"use client";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation"; // ✅ import usePathname
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../redux/auth/authThunk";
import { toggleSidebar } from "../../redux/ui/uiSlice";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current route
  const { user, isAuthenticated, isAdmin } = useAuth();

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <HeaderContainer>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {isAuthenticated && isAdmin && (
          <Button onClick={handleToggleSidebar}>☰</Button>
        )}
        <Logo onClick={handleLogoClick}>Smart Links</Logo>
      </div>

      <UserSection>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.username}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          pathname !== "/login" && ( // ✅ hide button on /login page
            <Button onClick={handleLoginClick}>Login</Button>
          )
        )}
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;
