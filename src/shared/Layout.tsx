import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`

const Title1 = styled.span`
  font-size: 30px;
  color: #fb8c00;
  font-family: 'Fredoka One', cursive;
`

const Title2 = styled.span`
  margin-top: -15px;
  font-size: 45px;
  color: #e91e62;
  font-family: 'Pacifico', cursive;
`

const Layout = () => (
  <div>
    <Logo>
      <Title1>Chá Rifa da</Title1>
      <Title2>Elisa</Title2>
    </Logo>

    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;