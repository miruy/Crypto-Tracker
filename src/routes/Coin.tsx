import { useParams } from "react-router";

// react-router-dom 6버전에서 useParams()의 기본 값이 string으로 변경됨
// coinId : string 타입이지만 따로 interface타입 정의 안함
function Coin() {
  const { coinId } = useParams();
  console.log(coinId);
  return <h1>Coin : {coinId}</h1>;
}

export default Coin;
