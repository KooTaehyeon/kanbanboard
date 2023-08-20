export type ReactText = string | number;
export type ReactChild = ReactElement | ReactText;
export interface ReactNodeArray extends Array<ReactNode> {}
export type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

export type Props = {
  children: ReactNode;
};

interface IlocalProps {
  setTest: () => void;
}

export interface KanBanCardProps {
  id: number;
  title: string;
  content: string;
  category: string;
}
interface drop {
  dropEffect: string;
  name: string;
}
