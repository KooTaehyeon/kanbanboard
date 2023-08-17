import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { KanBanCardProps } from '../../../types';
import { useRecoilState } from 'recoil';
import { kanbanList } from '../../../atom/kanbanBoard';
const KanBanCard = (props: { item: KanBanCardProps }) => {
  const [list, setList] = useRecoilState<any>(kanbanList);
  const index = list.findIndex((data: KanBanCardProps) => data === props.item);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const replaceIndex = (
    list: KanBanCardProps[],
    index: number,
    data: KanBanCardProps
  ) => {
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };
  const editTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newListArr = replaceIndex(list, index, {
      ...props.item,
      title: e.target.value,
    });
    setList(newListArr);
  };

  return <Card>{props.item.title}</Card>;
};

const Card = styled.div``;
export default KanBanCard;
