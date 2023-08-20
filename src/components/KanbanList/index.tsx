import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import { useDrop } from 'react-dnd';
const Card = (props: { title: string; children: any }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'card',
    drop: () => ({ name: props.title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  console.log(isOver, canDrop, 'liost');

  return (
    <KanbanListBox ref={drop}>
      <Title> {props.title}</Title>
      <KanbanList>{props.children}</KanbanList>
      <Button title={props.title} />
    </KanbanListBox>
  );
};

const Title = styled.h2`
  margin-top: 30px;
  text-align: center;
`;
const KanbanListBox = styled.section`
  width: 25%;
`;
const KanbanList = styled.div`
  border: 1px solid #908f8f;
  margin: 0 auto;
  width: 90%;
  min-height: 150px;
  border-radius: 10px;
  height: auto;
`;

export default Card;
