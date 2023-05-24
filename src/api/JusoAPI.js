export class JusoAPI {
  constructor() {}
  refineSigunguData({ code, name }) {
    if (
      [
        "4812000000",
        "4711000000",
        "4511000000",
        "4413000000",
        "4311000000",
        "4146000000",
        "4128000000",
        "4127000000",
        "4117000000",
        "4113000000",
        "4111000000",
      ].find((_code) => code === _code)
    ) {
      return null;
    }
    return { code: code.substring(0, 5), name };
  }
  async getSido() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_END_POINT}/api/bubjeongdong`
      );
      if (response.ok) {
        const { data } = await response.json();
        return data.map(({ code, name }) => ({
          code: code.substring(0, 2),
          name,
        }));
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  async getSigunGu(regionCode) {
    if (!regionCode) {
      return [];
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_END_POINT}/api/bubjeongdong/${regionCode}`
      );
      if (response.ok) {
        const { data } = await response.json();
        return data
          .map(({ code, name }) => {
            return this.refineSigunguData({
              code,
              name,
            });
          })
          .filter((data) => data);
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}
