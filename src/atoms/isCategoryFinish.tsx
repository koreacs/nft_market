import { atom } from 'recoil';

const isCategoryFinishAtom = atom<number>({
  key: 'isCategoryFinish',
  default: 0,
});

export default isCategoryFinishAtom;
