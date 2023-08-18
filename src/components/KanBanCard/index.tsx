import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { KanBanCardProps } from '../../../types';
import { useRecoilState } from 'recoil';
import Modal from '../Modal';
import { kanbanModal } from '../../../atom/kanbanModal';
const KanBanCard = (props: { item: KanBanCardProps }) => {
  const [isModal, setIsModal] = useRecoilState<boolean>(kanbanModal);
  return (
    <>
      {isModal && <Modal item={props.item} />}
      <Card onClick={() => setIsModal((prev) => !prev)}>
        <CardTitle>{props.item.title}</CardTitle>
        {/* <CardContent>{props.item.content}</CardContent> */}
      </Card>
    </>
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
