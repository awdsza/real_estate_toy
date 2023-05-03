import axios from "axios";
export default class EstateDataAPI {
  #instance = null;
  constructor() {
    this.#instance = axios.create({
      baseURL: "",
      params: {
        serviceKey: process.env.REACT_APP_API_KEY,
      },
    });
  }
  async getApartList(sigunguCode, pageNo = 1, numOfRows = 10) {
    const response = await axios.get("/dummy/getSigunguAptList.xml", {
      responseType: "text",
    });
    const { data } = response;
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const $items = xml.querySelectorAll("item");
    return Array.from($items).map((item) => ({
      as1: item.querySelector("as1").innerHTML,
      as2: item.querySelector("as2").innerHTML,
      as3: item.querySelector("as3").innerHTML,
      bjdCode: item.querySelector("bjdCode").innerHTML,
      kaptCode: item.querySelector("kaptCode").innerHTML,
      kaptName: item.querySelector("kaptName").innerHTML,
    }));
  }
}
