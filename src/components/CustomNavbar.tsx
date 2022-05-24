import { Navbar, Space } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { successNotice } from 'src/pages/tier-list/components/Notice';
import { RootState } from 'src/store';
import { BoxMultiple5, CheckupList, Copy, Hanger, Home, Settings } from 'tabler-icons-react';
import NavItem from './NavItem';

export default function Index() {
  const { t } = useTranslation();
  const userData = useSelector((state: RootState) => state.user.userData);
  const location = useLocation();

  const handleCopyText = useCallback(async () => {
    if (userData?.id) {
      navigator.clipboard.writeText(userData?.id);
      successNotice(t('copied'));
    }
  }, [t, userData?.id]);

  return (
    <Navbar sx={{ height: '-webkit-fill-available' }}>
      <Navbar.Section mx="xs">
        <Space h={60} />
      </Navbar.Section>
      <Navbar.Section mx="xs">
        <NavItem
          sx={{ height: '55px' }}
          title={t('nav.mainPage')}
          leftIcon={<Home />}
          disabled={!userData?.id}
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
          disabled={!userData?.id}
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
        <NavItem
          sx={{ height: '55px' }}
          title={t('nav.copy')}
          leftIcon={<Copy />}
          disabled={!userData?.id}
          onClick={handleCopyText}
        />
        <NavItem sx={{ height: '55px' }} title={t('nav.setting')} leftIcon={<Settings />} disabled />
      </Navbar.Section>
    </Navbar>
  );
}
