import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`

const Title1 = styled.span`
  font-size: 35px;
  color: #B28500;
  font-weight: bold;
`

const Title2 = styled.span`
  font-size: 40px;
  color: #f48fb1;
  font-weight: bold;
`

const Layout = () => (
  <div>
    <Logo>
      <Title1>CHÁ RIFA DA</Title1>
      <Title2>Elisa</Title2>
    </Logo>

    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;