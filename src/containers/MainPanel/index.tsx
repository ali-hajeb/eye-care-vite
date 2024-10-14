import React from 'react';
import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SimpleNavbar from '../../components/SimpleNavbar';
import {
  IconEyePlus,
  IconHome,
  IconPencilHeart,
  IconQuestionMark,
  IconTicket,
  IconUserHeart,
  IconUsersGroup,
} from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';

export interface MainPanelContainerProps {}

const data = [
  { link: '/', label: 'داشبور', icon: IconHome },
  { link: '/patients', label: 'بیماران', icon: IconUsersGroup },
  { link: '/nobat', label: 'نوبت', icon: IconTicket },
  { link: '/blog', label: 'مطالب', icon: IconPencilHeart },
  { link: '/ticket', label: 'پرسش و پاسخ', icon: IconQuestionMark },
  { link: '/profile', label: 'پروفایل', icon: IconUserHeart },
];

const MainPanelContainer: React.FunctionComponent<MainPanelContainerProps> = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  // const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened /*desktop: !desktopOpened*/ },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          {/* <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          /> */}
        <IconEyePlus size={48} stroke={2} color='#667BC6' />
        <Title order={1} fz={'h2'}>سامانه مدیریت بیماران</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <SimpleNavbar items={data} />
      </AppShell.Navbar>
      <AppShell.Main bg={'gray.3'}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default MainPanelContainer;
