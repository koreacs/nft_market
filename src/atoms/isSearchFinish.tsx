import { atom } from 'recoil';

const isSearchFinishAtom = atom<number>({
  key: 'isSearchFinish',
  default: 0,
});

export default isSearchFinishAtom;
