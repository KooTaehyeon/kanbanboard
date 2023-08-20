import Head from 'next/head';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { kanbanList } from '../../atom/kanbanBoard';
import KanbanCard from '../components/KanBanCard';
import styled from '@emotion/styled';
import KanBanBox from '../components/KanbanList';
import { KanBanCardProps } from '../../types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
export default function Home() {
  const kanbanFrame = useRecoilValue(kanbanList);
  const kanbanName = [
    {
      id: 1,
      title: 'Back log',
    },
    {
      id: 2,
      title: 'To do',
    },
    {
      id: 3,
      title: 'In progress',
    },
    {
      id: 4,
      title: 'Done',
    },
  ];
  const cardDataHandler = (title: string) => {
    // 카드 나열해주기 위한 함수
    return kanbanFrame
      .filter((data: KanBanCardProps) => data.category === title)
      .map((item: KanBanCardProps, idx) => (
        <KanbanCard key={idx} item={item} />
      ));
  };
  console.log(kanbanFrame, 'kanbanFrame');

  return (
    <>
      <Head>
        <title>KanbanBoard</title>
        <meta name='description' content='next를 활용한 칸반보드!' />
        <meta name='theme-color' content='#4E534E' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <KanbanListBox>
        <DndProvider backend={HTML5Backend}>
          {kanbanName &&
            kanbanName.map((item: any) => {
              return (
                <KanBanBox key={item.id} title={item.title}>
                  {cardDataHandler(item.title)}
                </KanBanBox>
              );
            })}
        </DndProvider>
      </KanbanListBox>
    </>
  );
}

const KanbanListBox = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
