import { atom } from 'recoil';

export const kanbanList = atom<[]>({
  key: 'kanbanBoard',
  default: [],
});
