import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanList } from '../../../atom/kanbanBoard';
import { KanBanCardProps } from '../../../types';
const KanbanListButton = (props: { title: string }) => {
  const [kanbanListData, setKanbanListData] = useRecoilState<any>(kanbanList);
  const addCardHandler = useCallback(
    (e: React.MouseEvent) => {
      if (kanbanListData.length === 0) {
        setKanbanListData([
          {
            id: kanbanListData.length + 1,
            title: '',
            content: '',
            category: props.title,
          },
        ]);
      } else {
        setKanbanListData([
          ...kanbanListData,
          {
            id: kanbanListData.length + 1,
            title: '',
            content: '',
            category: props.title,
          },
        ]);
      }
    },
    [kanbanListData, props.title, setKanbanListData]
  );

  return <Btn onClick={addCardHandler}>+Add</Btn>;
};

const Btn = styled.div`
  text-align: center;
  cursor: pointer;
`;

export default React.memo(KanbanListButton);
