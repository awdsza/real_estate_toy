export class JusoAPI {
  constructor() {}
  refineSigunguData({ code, name }) {
    if (
      [
        "4812100000",
        "4812300000",
        "4812500000",
        "4812700000",
        "4812900000",
        "4817040000",
        "4872040000",
        "4874040000",
        "4882040000",
        "4885040000",
        "4886040000",
        "4887040000",
        "4888040000",
        "4889040000",
        "4711100000",
        "4711300000",
        "4715040000",
        "4717040000",
        "4723040000",
        "4725040000",
        "4773040000",
        "4790040000",
        "4793040000",
        "4615040000",
        "4617040000",
        "4671040000",
        "4672040000",
        "4677040000",
        "4678040000",
        "4679040000",
        "4681040000",
        "4682040000",
        "4688040000",
        "4691040000",
        "4571040000",
        "4572040000",
        "4575040000",
        "4577040000",
        "4579040000",
        "4580040000",
        "4521040000",
        "4519040000",
        "4518040000",
        "4514040000",
        "4513040000",
        "4511100000",
        "4511300000",
        "4481040000",
        "4477040000",
        "4476040000",
        "4423040000",
        "4421040000",
        "4420040000",
        "4418040000",
        "4415040000",
        "4413100000",
        "4413300000",
        "4376040000",
        "4374040000",
        "4372040000",
        "4313040000",
        "4311100000",
        "4311200000",
        "4311300000",
        "4311400000",
        "4211040000",
        "4183040000",
        "4165040000",
        "4159040000",
        "4155040000",
        "4148040000",
        "4146100000",
        "4146300000",
        "4146500000",
        "4127100000",
        "4127300000",
        "4128100000",
        "4128500000",
        "4128700000",
        "4117100000",
        "4117300000",
        "4113100000",
        "4113300000",
        "4113500000",
        "4111700000",
        "2871040000",
        "3171040000",
        "4111100000",
        "4111300000",
        "4111500000",
      ].find((_code) => code === _code)
    ) {
      return null;
    }
    return { code: code.substring(0, 4), name };
  }
  async getSido() {
    try {
      const sidoStorage = localStorage.getItem("sidoData");
      if (sidoStorage) {
        return JSON.parse(sidoStorage);
      }
      const response = await fetch(
        `${process.env.REACT_APP_JUSO_END_POINT_URL}*00000000`
      );
      if (response.ok) {
        const { regcodes } = await response.json();
        const sidoData = regcodes.map(({ code, name }) => ({
          code: code.substring(0, 2),
          name,
        }));
        localStorage.setItem("sidoData", JSON.stringify(sidoData));
        return sidoData;
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  async getSigunGu(regionCode) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JUSO_END_POINT_URL}${regionCode}***0000`
      );
      if (response.ok) {
        const { regcodes } = await response.json();
        const { name: sidoName } = regcodes[0];
        regcodes.splice(0, 1);
        return regcodes
          .map(({ code, name }) => {
            return this.refineSigunguData({
              code,
              name: name.replace(`${sidoName} `, ""),
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
