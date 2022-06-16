import { atom } from 'recoil';
import { IAuction } from '../types';
console.log("IAuction :::::::::::::::::::::::::::::", IAuction)
const myFavoriteAuctionsAtom = atom<IAuction[]>({
  key: 'myFavoriteAuctions',
  default: [],
});

export default myFavoriteAuctionsAtom;
