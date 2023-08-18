import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanList } from '../../../atom/kanbanBoard';
import { KanBanCardProps } from '../../../types';
import { kanbanModal } from '../../../atom/kanbanModal';
const KanbanListButton = (props: { title: string }) => {
  const [kanbanListData, setKanbanListData] = useRecoilState<any>(kanbanList);
  const setIsModal = useSetRecoilState<boolean>(kanbanModal);
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
      setIsModal((prev) => !prev);
    },
    [kanbanListData, props.title, setIsModal, setKanbanListData]
  );

  return <Btn onClick={addCardHandler}>+Add</Btn>;
};

const Btn = styled.div`
  text-align: center;
  cursor: pointer;
`;

export default KanbanListButton;
