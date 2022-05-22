import { Navbar, Space, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { BoxMultiple5, CheckupList, Copy, Hanger, Settings } from 'tabler-icons-react';
import NavItem from './NavItem';

export default function Index() {
  const { t } = useTranslation();

  return (
    <Navbar sx={{ height: '100vh' }}>
      <Navbar.Section mx="xs">
        <Space h={60} />
      </Navbar.Section>
      <Navbar.Section grow mx="xs">
        <NavItem title={t('nav.strong')} leftIcon={<BoxMultiple5 />} selecting disabled />
        <NavItem title={t('nav.practice')} leftIcon={<CheckupList />} disabled />
        <NavItem title={t('nav.skin')} leftIcon={<Hanger />} disabled />
      </Navbar.Section>
      <Navbar.Section
        mx="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        })}
      >
        <NavItem sx={{ height: '60px' }} title={t('nav.copy')} leftIcon={<Copy />} disabled />
        <NavItem sx={{ height: '60px' }} title={t('nav.setting')} leftIcon={<Settings />} disabled />
      </Navbar.Section>
    </Navbar>
  );
}
