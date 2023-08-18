import { atom } from 'recoil';
export const kanbanModal = atom<boolean>({
  key: 'kanbanModalState',
  default: false,
});
