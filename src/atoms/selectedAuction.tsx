import { atom } from 'recoil';
import { IAuction } from '../types';

const selectedAuctionAtom = atom<IAuction | null>({
  key: 'selectedAuction',
  default: null,
});

export default selectedAuctionAtom;
