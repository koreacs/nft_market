import { atom } from 'recoil';

const auctionCategoryAtom = atom<number>({
  key: 'auctionCategory',
  default: 0,
});

export default auctionCategoryAtom;
