export default class EstateDataAPI {
  #instance = null;
  async getApartList({
    bubJeongDongCode = "",
    id = "",
    keyword = "",
    page = 1,
    numOfRows = 10,
  }) {
    try {
      const response = await fetch(
        `/api/apartment?page=${page}&numOfRows=${numOfRows}&keyword=${keyword}&bubJeongDongCode=${bubJeongDongCode}&id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  async getApartTradeList({ bubjeongdongCode, jibun, dealYear = 2020 }) {
    try {
      const response = await fetch(
        `/api/trade/detail?bubJeongDongCode=${bubjeongdongCode}&jibun=${jibun}&dealYear=${dealYear}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        return await response.json();
      }
      return {};
    } catch (error) {
      console.error(error);
      return { error, data: null };
    }
  }
}
