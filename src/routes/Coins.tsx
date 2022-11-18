import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in; // Coin 영역의 a태그가 0.2만에 색깔이 변함
    display: block; // a태그를 가지고 있는 블록을 전체 선택(포함)
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
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

// Coin객체의 타입을 지정, typescript한테 알려줌
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// 노란 ()(); : execute함수, 첫번째 ()에 함수를 넣을 수 있으며, 페이지 실행 시 바로 해당 함수 실행
// 코인 API 100개만 호출
function Coins() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100)); // 코인 세팅이 완료되면
      setLoading(false); // loading완료
    })();
  }, []);
  console.log(coins);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
