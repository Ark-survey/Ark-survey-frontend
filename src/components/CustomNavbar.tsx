import { Navbar, Space, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'src/store';
import { BoxMultiple5, CheckupList, Copy, Hanger, Home, Settings } from 'tabler-icons-react';
import NavItem from './NavItem';

export default function Index() {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();

  return (
    <Navbar sx={{ height: '100vh' }}>
      <Navbar.Section mx="xs">
        <Space h={60} />
      </Navbar.Section>
      <Navbar.Section mx="xs">
        <NavItem
          sx={{ height: '55px' }}
          title={t('nav.mainPage')}
          leftIcon={<Home />}
          disabled={!user.userData.id}
          selecting={location.pathname === '/'}
          to="/"
        />
      </Navbar.Section>
      <Navbar.Section
        grow
        mx="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        })}
      >
        <NavItem
          to="/tierList"
          title={t('nav.strong')}
          leftIcon={<BoxMultiple5 />}
          selecting={location.pathname === '/tierList'}
          disabled={!user.userData.id}
          operations
        />
        <NavItem title={t('nav.practice')} leftIcon={<CheckupList />} disabled />
        <NavItem title={t('nav.skin')} leftIcon={<Hanger />} disabled />
      </Navbar.Section>
      <Navbar.Section
        mx="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        })}
      >
        <NavItem sx={{ height: '55px' }} title={t('nav.copy')} leftIcon={<Copy />} disabled={!user.userData.id} />
        <NavItem sx={{ height: '55px' }} title={t('nav.setting')} leftIcon={<Settings />} disabled />
      </Navbar.Section>
    </Navbar>
  );
}
