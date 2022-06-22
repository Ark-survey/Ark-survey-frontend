import { Navbar, Space, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useChangeSize } from 'src/hooks/useChangeSize';
import { successNotice } from 'src/components/Notice';
import NavItem from './NavItem';
import { navbarData } from 'src/pages/route';
import { useMeta } from 'src/pages/store';

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
  const { user } = useMeta();

  const handleCopyText = async () => {
    if (user.id) {
      if (!navigator.clipboard) {
        copyToClip(user.id);
        successNotice(t('copied-old'));
        return;
      }
      navigator.clipboard.writeText(user.id);
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
                  disabled={it.disabled || (it.needLogin && !user.id)}
                  onClick={() => it.action === 'copy-id' && handleCopyText()}
                />
              ) : (
                <NavItem
                  key={i}
                  title={t('nav.' + it.id)}
                  to={'/' + it.id}
                  leftIcon={it.icon}
                  selecting={location.pathname === '/' + it.id}
                  disabled={it.disabled || (it.needLogin && !user.id)}
                />
              ),
            )}
          </Stack>
        </Navbar.Section>
      ))}
    </Navbar>
  );
}
