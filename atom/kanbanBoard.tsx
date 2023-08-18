import { atom } from 'recoil';
import { KanBanCardProps } from '../types';
export const kanbanList = atom<KanBanCardProps[]>({
  key: 'kanbanBoard',
  default: [],
});
