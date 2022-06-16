import { atom } from 'recoil';

const auctionKeywordAtom = atom<string>({
  key: 'auctionKeyword',
  default: '',
});

export default auctionKeywordAtom;
