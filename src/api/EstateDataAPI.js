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
        `${process.env.REACT_APP_API_END_POINT}/api/apartment?page=${page}&numOfRows=${numOfRows}&keyword=${keyword}&bubJeongDongCode=${bubJeongDongCode}&id=${id}`,
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
  async getApartTradeList({
    bubjeongdongCode,
    jibun,
    startYear,
    endYear,
    page = 1,
    numOfRows = 10,
  }) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_END_POINT}/api/trade/detail?bubJeongDongCode=${bubjeongdongCode}&jibun=${jibun}&startYear=${startYear}&endYear=${endYear}&page=${page}&numOfRows=${numOfRows}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      return {};
    } catch (error) {
      console.error(error);
      return { error, data: null };
    }
  }
  async getApartTradeChartData({ bubjeongdongCode, jibun }) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_END_POINT}/api/trade/chart?bubJeongDongCode=${bubjeongdongCode}&jibun=${jibun}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      return {};
    } catch (error) {
      console.error(error);
      return { error, data: null };
    }
  }
}
