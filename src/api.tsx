// fetcher 함수, React-Query를 사용하여 API를 fetch하는 용도

export function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
