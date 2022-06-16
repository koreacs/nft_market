import { atom } from 'recoil';

const auctionSortAtom = atom<number>({
  key: 'auctionSort',
  default: 0,
});

export default auctionSortAtom;
