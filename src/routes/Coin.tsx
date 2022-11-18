import { useParams, useLocation } from "react-router";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  font-size: 20px;
  color: white;
  display: block;
`;

interface RouterState {
  name: string;
}

// react-router-dom 6버전에서 useParams()의 기본 값이 string으로 변경됨
// coinId : string 타입이지만 따로 interface타입 정의 안함
function Coin() {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);

  // interface RouterState로부터 state 값을 바로 호출
  const location = useLocation();
  const name = location.state as RouterState;

  return (
    <Container>
      <Header>
        <Title>{name?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
