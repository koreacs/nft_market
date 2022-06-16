import { atom } from 'recoil';

const createItemCategoryAtom = atom<number>({
  key: 'createItemCategory',
  default: 1,
});

export default createItemCategoryAtom;
