import React from 'react';
import styled from '@emotion/styled';
import { KanBanCardProps } from '../../../types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { kanbanList } from '../../../atom/kanbanBoard';
import { kanbanModal } from '../../../atom/kanbanModal';

const Modal = (props: { item: KanBanCardProps }) => {
  const [list, setList] = useRecoilState<any>(kanbanList);
  const setIsModal = useSetRecoilState<boolean>(kanbanModal);
  const index = list.findIndex((data: KanBanCardProps) => data === props.item);
  const onCloseHandler = (e: React.MouseEvent) => {
    setIsModal((prev: boolean) => !prev);
  };

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
  console.log(props.item, 'ahekf');

  return (
    <>
      <Bg onClick={onCloseHandler} />
      <ModalBox>
        <h3>{props.item.category}</h3>
        <label htmlFor='massage'>Title</label>
        <input
          value={props.item.title}
          placeholder='내용을 입력해주세요'
          onChange={editTitleHandler}
        />
        <label htmlFor='massage'>내용</label>
        <textarea
          name='massage'
          cols={30}
          rows={10}
          value={props.item.content}
          placeholder='내용을 입력해주세요'
          onChange={editContentHandler}
        />
        <div className='btn'>
          <div onClick={onCloseHandler}>등록 및 수정</div>
          <div onClick={deleteHandler}>삭제 하기</div>
        </div>
      </ModalBox>
    </>
  );
};
const Bg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #dcdcdc;
  overflow: hidden;
  z-index: 1;
  opacity: 0.9;
`;
const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 360px;
  min-height: 300px;
  padding: 20px;
  border-radius: 8px;
  margin: auto;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-sizing: border-box;
  z-index: 10;
  text-align: center;
  h3 {
    margin-bottom: 10px;
  }
  .btn {
    display: flex;
    margin-top: 15px;
    div {
      width: 40%;
      margin: 0 auto;
      /* margin: 15px 15px 0px 15px; */
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;
      /* width: 25%; */
      display: inline-box;
      border: 1px solid #00aaff;
      border-radius: 4px;
      padding: 10px;
      background: #00aaff;
      color: #fff;
    }
  }

  li {
    margin: 20px 0;
  }
  label {
    display: block;
    margin-bottom: 8px;
    color: gray;
    font-size: 15px;
  }
  p {
    padding-left: 10px;
    font-weight: bold;
    word-wrap: break-word;
  }
  input {
    margin-bottom: 20px;
    width: 90%;
    border-radius: 4px;
    border: 1px solid gray;
    padding: 5px;
    ::placeholder {
      color: gray;
    }
  }
  textarea {
    height: 36px;
    width: 90%;
    height: 50px;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 6px;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
    ::placeholder {
      color: gray;
    }
  }
`;

export default Modal;
