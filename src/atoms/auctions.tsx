import { atom } from 'recoil';
import { IAuction } from '../types';

const auctionsAtom = atom<IAuction[]>({
  key: 'auctions',
  default: [],
});

export default auctionsAtom;
