// fetcher 함수, React-Query를 사용하여 API를 fetch하는 용도

const BASE_URL = `https://api.coinpaprika.com/v1`;
// coins API 호출
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

// coins API로부터 받아온 coin 정보 호출
export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

// coins API로부터 받아온 coin의 가격 정보 호출
export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}
