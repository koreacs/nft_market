import { atom } from 'recoil';

const walletAccountAtom = atom({
  key: 'walletAccount',
  default: '',
});

export default walletAccountAtom;
