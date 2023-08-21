import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { KanBanCardProps, drop } from '../../../types';
import { useRecoilState } from 'recoil';
import { kanbanList } from '../../../atom/kanbanBoard';
import { useDrag } from 'react-dnd';
import Image from 'next/image';
import cancel from '../../../public/img/cancel.png';
const KanBanCard = (props: { item: KanBanCardProps }) => {
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
  };
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '50px';
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
  };
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: props.item,
    end: (item: KanBanCardProps, monitor) => {
      const dropResult: drop | null = monitor.getDropResult<any>();

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
    <Card ref={dragRef} style={{ opacity: isDragging ? '0.3' : '1' }}>
      <div>
        <CardTitle
          type='text'
          value={props.item.title}
          onChange={editTitleHandler}
          placeholder='제목을 입력하세요'
        />
        <Image
          style={{ position: 'relative', top: '9px', cursor: 'pointer' }}
          src={cancel}
          width={12}
          height={12}
          alt='delete'
          onClick={deleteHandler}
        />
      </div>

      <CardContent
        value={props.item.content}
        onChange={editContentHandler}
        onInput={handleResizeHeight}
        ref={ref}
        placeholder='내용을 입력하세요'
        spellCheck='false'
      />
    </Card>
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

const CardTitle = styled.input`
  width: 90%;
  margin: 10px 0 5px 0;
  padding: 0px 5px;
  border: none;
  outline: 0;
  font-size: 14px;
  font-weight: 700;
  text-overflow: ellipsis;
  background-color: none;
  background: transparent;
  color: #000000;
`;
const CardContent = styled.textarea`
  height: 50px;
  border: none;
  padding: 0px 5px;
  outline: 0;
  resize: none;
  overflow: visible;
  font-size: 13px;
  font-weight: 300;
  background-color: none;
  background: transparent;
  color: #000000;
`;
export default KanBanCard;
