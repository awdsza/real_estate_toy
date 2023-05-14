export default class EstateDataAPI {
  #instance = null;
  async getApartList({
    bubJeongDongCode = "",
    id = "",
    searchKeyword = "",
    page = 1,
    numOfRows = 10,
  }) {
    try {
      const response = await fetch(
        `/api/apartment?page=${page}&numOfRows=${numOfRows}&keyword=${searchKeyword}&bubJeongDongCode=${bubJeongDongCode}&id=${id}`,
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
  async getDetail(LAWD_CD, DEAL_YMD) {}
}
