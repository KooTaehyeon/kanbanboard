import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useRecoilValue } from 'recoil';
import { kanbanList } from '../../atom/kanbanBoard';

import styled from '@emotion/styled';
import KanBanBox from '../components/KanbanList';
const inter = Inter({ subsets: ['latin'] });

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
  console.log('kanbanName ', kanbanName);
  return (
    <>
      <Head>
        <title>KanbanBoard</title>
        <meta name='description' content='next를 활용한 칸반보드!' />
        <meta name='theme-color' content='#4E534E' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <KanbanListBox>
        {kanbanName &&
          kanbanName.map((item: any) => {
            return <KanBanBox key={item.id} title={item.title} />;
          })}
      </KanbanListBox>
    </>
  );
}

const KanbanListBox = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
