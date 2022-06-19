import { Navbar, Space, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useChangeSize } from 'src/hooks/useChangeSize';
import { successNotice } from 'src/components/Notice';
import { RootState } from 'src/store';
import NavItem from './NavItem';
import { navbarData } from 'src/pages/route';

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
  const location = useLocation();
  const { height } = useChangeSize();
  const userData = useSelector((state: RootState) => state.user.userData);

  const handleCopyText = async () => {
    if (userData?.id) {
      if (!navigator.clipboard) {
        copyToClip(userData?.id);
        successNotice(t('copied-old'));
        return;
      }
      navigator.clipboard.writeText(userData?.id);
      successNotice(t('copied'));
    }
  };

  return (
    <Navbar sx={{ height }}>
      <Navbar.Section mx="xs">
        <Space h={60} />
      </Navbar.Section>
      {navbarData.map((section, index) => (
        <Navbar.Section
          grow={section.grow}
          key={index}
          mx="xs"
          sx={(theme) => ({
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
          })}
        >
          <Stack py="xs" spacing="xs">
            {section.nav.map((it, i) =>
              it.action === 'copy-id' ? (
                <NavItem
                  key={i}
                  title={t('nav.' + it.id)}
                  leftIcon={it.icon}
                  disabled={it.disabled || (it.needLogin && !userData?.id)}
                  onClick={() => it.action === 'copy-id' && handleCopyText()}
                />
              ) : (
                <NavItem
                  key={i}
                  title={t('nav.' + it.id)}
                  to={'/' + it.id}
                  leftIcon={it.icon}
                  selecting={location.pathname === '/' + it.id}
                  disabled={it.disabled || (it.needLogin && !userData?.id)}
                />
              ),
            )}
          </Stack>
        </Navbar.Section>
      ))}
    </Navbar>
  );
}
