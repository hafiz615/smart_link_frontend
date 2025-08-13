"use client";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Link from "next/link";

const SidebarContainer = styled.aside`
  position: fixed;
  left: ${(props) => (props.open ? "0" : "-250px")};
  top: 60px;
  width: 250px;
  height: calc(100vh - 60px);
  background: #2c3e50;
  color: white;
  transition: left 0.3s ease;
  z-index: 999;
  overflow-y: auto;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarItem = styled.li`
  border-bottom: 1px solid #34495e;
`;

const SidebarLink = styled(Link)`
  display: block;
  padding: 1rem 1.5rem;
  color: white;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: #34495e;
  }
`;

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);

  return (
    <SidebarContainer open={sidebarOpen}>
      <SidebarList>
        <SidebarItem>
          <SidebarLink href="/admin/dashboard">Dashboard</SidebarLink>
        </SidebarItem>
        <SidebarItem>
          <SidebarLink href="/">Public View</SidebarLink>
        </SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
