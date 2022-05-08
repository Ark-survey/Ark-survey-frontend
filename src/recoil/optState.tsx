import { atom } from "recoil";
import { opData } from "src/contexts";

export interface optType {
  id: string,
  name: string,
  profession: string,
  sex: string,
  rate: number,
  deployment: string,
  accessChannel: string,
  ts: number,
  imgUrl: string,
  selected: boolean
}

const optState = atom({
  key: 'optState',
  default: opData.map(item => ({
    ...item,
    selected: false
  })) as optType[]
});

export { optState }