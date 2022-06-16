import { atom } from 'recoil';
import { IItem } from '../types';

console.log("IItem :::::::::::::::::", IItem)
const myItemsAtom = atom<IItem[]>({
  key: 'myItems',
  default: [],
});

export default myItemsAtom;
