import { atom } from 'recoil';
import { IAuction } from '../types';
console.log("IAuction :::::::::::::::::::::::::::::", IAuction)
const myAuctionsAtom = atom<IAuction[]>({
  key: 'myAuctions',
  default: [],
});

export default myAuctionsAtom;
