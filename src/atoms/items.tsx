import { atom } from 'recoil';
import { IItem } from '../types';

const itemsAtom = atom<IItem[]>({
  key: 'items',
  default: [],
});

export default itemsAtom;
