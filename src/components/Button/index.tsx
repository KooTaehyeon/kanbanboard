import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { kanbanList } from '../../../atom/kanbanBoard';
import { KanBanCardProps } from '../../../types';
const KanbanListButton = (props: { title: string }) => {
  const [kanbanListData, setKanbanListData] = useRecoilState<any>(kanbanList);
  // id 생성
  const getStateId: number =
    kanbanListData.length > 0
      ? kanbanListData[kanbanListData.length - 1].id + 1
      : 0;
  const addCardHandler = useCallback(
    (e: React.MouseEvent) => {
      setKanbanListData((prev: KanBanCardProps[]) => {
        [
          ...prev,
          {
            id: getStateId,
            title: '',
            content: '',
            category: props.title,
          },
        ];
      });
    },
    [getStateId, props.title, setKanbanListData]
  );

  return <Btn onClick={addCardHandler}>+Add</Btn>;
};

const Btn = styled.div`
  text-align: center;
  cursor: pointer;
`;

export default KanbanListButton;
