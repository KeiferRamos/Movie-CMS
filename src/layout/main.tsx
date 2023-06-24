import SideBar from '../components/sidebar';
import styled from 'styled-components';
import { Spin, Breadcrumb } from 'antd';

export const StyledContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #fff;
  display: grid;
  grid-template-columns: 300px 1fr;
`;

export const StyledSpinner = styled(Spin)`
  height: 100%;
  display: grid;
  place-items: center;
  background: #fff;
`;

function Layout({ isSpinning, children, routes }) {
  return (
    <StyledContainer>
      <SideBar />
      <StyledSpinner size="large" spinning={isSpinning} />
      <div style={{ padding: 30 }}>
        <Breadcrumb items={routes} style={{ marginBottom: 20 }} />
        {!isSpinning ? children : null}
      </div>
    </StyledContainer>
  );
}

export default Layout;
