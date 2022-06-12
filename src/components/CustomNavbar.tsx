import { Navbar, Space, Stack } from '@mantine/core';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useChangeSize } from 'src/hooks';
import { successNotice } from 'src/pages/tier-list/components/Notice';
import { RootState } from 'src/store';
import {
  BoxMultiple5,
  ChartBar,
  CheckupList,
  Copy,
  Home,
  Notebook,
  School,
  Settings,
  ThumbUp,
} from 'tabler-icons-react';
import NavItem from './NavItem';

function copyToClip(content: string) {
  const aux = document.createElement('input');
  aux.style.position = 'absolute';
  aux.setAttribute('value', content);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
}

export default function Index() {
  const { t } = useTranslation();
  const userData = useSelector((state: RootState) => state.user.userData);
  const location = useLocation();
  const { height } = useChangeSize();

  const handleCopyText = useCallback(async () => {
    if (userData?.id) {
      if (!navigator.clipboard) {
        copyToClip(userData?.id);
        successNotice(t('copied-old'));
        return;
      }
      navigator.clipboard.writeText(userData?.id);
      successNotice(t('copied'));
    }
  }, [t, userData?.id]);

  return (
    <Navbar sx={{ height }}>
      <Navbar.Section mx="xs">
        <Space h={60} />
      </Navbar.Section>
      <Navbar.Section mx="xs">
        <Stack py="xs" spacing="xs">
          <NavItem title={t('nav.mainPage')} leftIcon={<Home />} selecting={location.pathname === '/'} to="/" />
        </Stack>
      </Navbar.Section>
      <Navbar.Section
        mx="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        })}
      >
        <Stack py="xs" spacing="xs">
          <NavItem title={t('nav.basic')} leftIcon={<School />} disabled />
          <NavItem
            title={t('nav.char')}
            to="/charBox"
            leftIcon={<CheckupList />}
            selecting={location.pathname === '/charBox'}
          />
          <NavItem
            to="/tierList"
            title={t('nav.strong')}
            leftIcon={<BoxMultiple5 />}
            selecting={location.pathname === '/tierList'}
            disabled={!userData?.id}
          />
          <NavItem title={t('nav.love')} leftIcon={<ThumbUp />} disabled />
        </Stack>
      </Navbar.Section>
      <Navbar.Section
        grow
        mx="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        })}
      >
        <Stack py="xs" spacing="xs">
          <NavItem title={t('nav.note')} leftIcon={<Notebook />} disabled />
          <NavItem
            title={t('nav.statistics')}
            leftIcon={<ChartBar />}
            selecting={location.pathname === '/statistics'}
            to="/statistics"
          />
        </Stack>
      </Navbar.Section>
      <Navbar.Section
        mx="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        })}
      >
        <Stack py="xs" spacing="xs">
          {userData?.id && (
            <NavItem
              sx={{ height: '55px' }}
              title={t('nav.copy')}
              leftIcon={<Copy />}
              disabled={!userData?.id}
              onClick={handleCopyText}
            />
          )}
          <NavItem
            sx={{ height: '55px' }}
            title={t('nav.setting')}
            selecting={location.pathname === '/setting'}
            leftIcon={<Settings />}
            to="/setting"
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
