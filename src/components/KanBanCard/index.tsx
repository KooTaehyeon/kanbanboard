import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { KanBanCardProps, drop } from '../../../types';
import { useRecoilState } from 'recoil';
import Modal from '../Modal';
import { kanbanModal } from '../../../atom/kanbanModal';
import { kanbanList } from '../../../atom/kanbanBoard';
import { useDrag } from 'react-dnd';
const KanBanCard = (props: { item: KanBanCardProps }) => {
  const [isModal, setIsModal] = useRecoilState<boolean>(kanbanModal);
  const [list, setList] = useRecoilState<KanBanCardProps[]>(kanbanList);
  const index = list.findIndex((data) => data === props.item);
  const ref = useRef<HTMLTextAreaElement>(null);
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
  const editContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newListArr = replaceIndex(list, index, {
      ...props.item,
      content: e.target.value,
    });
    setList(newListArr);
  };
  const deleteHandler = () => {
    const newListArr = list.filter(
      (item: KanBanCardProps) => item.id !== props.item.id
    );
    setList(newListArr);
    setIsModal((prev: boolean) => !prev);
  };
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '70px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);
  const changeItemCategory = (selectedItem: KanBanCardProps, title: string) => {
    console.log(selectedItem.id, 'selectedItem');
    setList((prev) => {
      console.log(title, 'prev', selectedItem.category);
      return prev.map((e) => {
        return {
          ...e,
          category: e.id === selectedItem.id ? title : e.category,
        };
      });
    });
    console.log(list, 'list');
  };
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: props.item,
    end: (item: KanBanCardProps, monitor) => {
      const dropResult: any = monitor.getDropResult<any>();
      console.log(dropResult);

      if (dropResult) {
        switch (dropResult.name) {
          case 'Back log':
            changeItemCategory(item, 'Back log');
            break;
          case 'To do':
            changeItemCategory(item, 'To do');
            break;
          case 'In progress':
            changeItemCategory(item, 'In progress');
            break;
          case 'Done':
            changeItemCategory(item, 'Done');
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragRef} style={{ opacity: isDragging ? '0.3' : '1' }}>
      <div>
        <span>{props.item.category}</span>
        <img src='../' alt='delete' onClick={deleteHandler} />
      </div>
      <input
        type='text'
        value={props.item.title}
        onChange={editTitleHandler}
        placeholder='제목을 입력하세요'
      />
      <textarea
        value={props.item.content}
        onChange={editContentHandler}
        onInput={handleResizeHeight}
        ref={ref}
        placeholder='내용을 입력하세요'
        spellCheck='false'
      />
    </div>
  );
};

const Card = styled.div`
  width: 95%;
  min-height: 30px;
  margin: 5px auto;
  border-radius: 10px;
  border: 1px solid grey;
  &:hover {
    border: 1px solid #00aaff;
  }
`;
const CardTitle = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 100%;
  line-height: 33px;
  cursor: pointer;
  &:hover {
    color: #00aaff;
  }
`;
// const CardContent = styled.div``;
export default KanBanCard;
