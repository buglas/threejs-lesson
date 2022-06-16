// const path = "http://127.0.0.1:4523/mock/772752/cabinet/";
const path = '	https://mock.apifox.cn/m1/772752-0-default/cabinet/'
function getCabinetByName(name: string) {
  return fetch(path + name).then((res) => res.json());
}
export { getCabinetByName };
