import { atom } from 'recoil';

const isAuctionFinishAtom = atom<boolean>({
  key: 'isAuctionFinish',
  default: false,
});

export default isAuctionFinishAtom;
