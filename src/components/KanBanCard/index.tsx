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
    // list text,content value 값 변경 함수
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };
  const editTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //title 변경 함수
    const newListArr = replaceIndex(list, index, {
      ...props.item,
      title: e.target.value,
    });
    setList(newListArr);
  };
  const editContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // content 변경함수
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
    // content textarea 동적으로 height 동적으로 커지게 하는 함수
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '50px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);
  const changeItemCategory = (selectedItem: KanBanCardProps, title: string) => {
    // 드래그 후 dreg된 카드가 Category로 변경되는 함수
    setList((prev) => {
      return prev.map((e) => {
        return {
          ...e,
          category: e.id === selectedItem.id ? title : e.category,
        };
      });
    });
  };
  const [{ isDragging }, dragRef] = useDrag(() => ({
    // isDragging 는 card가 드래깅 중일때 true 이며 아닐때는 false 로 리턴해줌
    // dragRef 는 드래그 될 부분에 ref를 적용시켜줌
    type: 'card',
    item: props.item, // 드래그될 card에 넣어질 정보

    end: (item: KanBanCardProps, monitor) => {
      // 드래그가 끝나고 dropResult 값에 따라 작동할 코드
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
      // 현재 드래깅중인지 확인
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
export default React.memo(KanBanCard);
