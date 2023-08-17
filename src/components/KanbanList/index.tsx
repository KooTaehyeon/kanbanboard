import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
const index = (props: { title: string; children: any }) => {
  return (
    <KanbanListBox>
      <Title> {props.title}</Title>
      <KanbanList>
        {props.children}
        <Button title={props.title} />
      </KanbanList>
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
  border: 1px solid #dcdcdc;
  width: 100%;
  height: 500px;
`;

export default index;
