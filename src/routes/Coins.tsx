import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in; // Coin 영역의 a태그가 0.2만에 색깔이 변함
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// Coin객체의 타입을 지정, typescript한테 알려줌
interface ICoin {
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
  /*
    - react-query 사용으로 해당 코드를 아래 한줄로 대체함
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
  */
  /* 
     1. react-query의 useQuesry()를 이용
     2. useQuery()는 key, value를 가지며 key : value로 올 함수의 식별이름값 / value: 실행하고자 하는 함수
     3. useQuery()는 react-query가 제공하는 두개의 return 값을 가짐
        - isLoading: value함수의 실행 전/후를 boolean형태로 알려주고
        - data : value함수가 실행 완료 후 가져온 데이터
     4. <ICoin[]> : data가 fetchCoins에서 가져온 데이터라는 것을 typescript에게 알려줌(위에 정의해놓은 인터페이스) 
     5. fetchCoins으로 가져온 coins 데이터들의 개수를 자름 : { data?.slice(0, 100).map(~)}
  */
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
