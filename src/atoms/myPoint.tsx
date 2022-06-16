import { atom } from 'recoil';

const myPointAtom = atom({
  key: 'myPoint',
  default: '0',
});

export default myPointAtom;
