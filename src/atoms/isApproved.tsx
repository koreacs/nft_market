import { atom } from 'recoil';

const isApprovedAtom = atom<boolean>({
  key: 'isApproved',
  default: false,
});

export default isApprovedAtom;
