import { Box, createStyles, Header, ScrollArea, Space, Overlay } from '@mantine/core';
import Footer from 'src/components/Footer';
import CustomNavbar from 'src/components/CustomNavbar';
import { Brand } from 'src/components/Brand';
import { useChangeSize } from 'src/hooks/useChangeSize';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useEffect, useRef } from 'react';
import { RootRouter } from './route';
import { useLoadingGlobalData } from 'src/hooks/useLoadingGlobalData';
import { useLoadStaticFile } from 'src/hooks/useLoadStaticFile';
import { useMeta, useSetting } from './store';

const useStyles = createStyles((theme, { menuOpen }: { menuOpen: boolean }, getRef) => ({
  container: {
    width: 'calc(100vw - 170px)',
    maxHeight: '-webkit-fill-available',
    // overflow: 'auto',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      position: 'fixed',
      width: '100vw',
    },
    zIndex: 3,
    '.mantine-ScrollArea-scrollbar': {
      zIndex: 2,
    },
  },
  page: {
    position: 'relative',
    width: '100%',
    background: theme.white,
    boxShadow: `0 0 5px 5px rgb(0 0 0 / 15%)`,
    minHeight: '100vh',
    zIndex: 1,
  },
  footerPlaceholder: {
    pointerEvents: 'none',
    position: 'relative',
    height: '140px',
    opacity: 0,
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      height: '200px',
    },
  },
  footer: {
    position: 'fixed',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1],
    bottom: 0,
    left: 0,
    boxSizing: 'border-box',
    marginLeft: 170,
    width: 'calc(100vw - 170px)',
    height: '140px',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginLeft: 0,
      width: '100vw',
    },
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      marginLeft: 0,
      height: '200px',
      width: '100vw',
    },
  },
  scrollArea: {
    width: 170,
    height: '100%',
    background: '#fff',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 10,
    overflow: 'auto',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      position: 'fixed',
    },
  },
}));

export default function PageContainer() {
  const { downSM } = useWindowSize();
  const { user, setUser } = useMeta();
  const { setting, setSettingKeyValue } = useSetting();
  const { classes, cx } = useStyles({ menuOpen: setting.menuOpened });

  useLoadingGlobalData();
  useLoadStaticFile();

  useEffect(() => {
    setSettingKeyValue('menuOpened', !downSM);
  }, [downSM, setSettingKeyValue]);

  const refreshing = useRef(false);
  useEffect(() => {
    navigator.serviceWorker.addEventListener('controllerchange', async () => {
      if (refreshing.current) {
        return;
      }
      refreshing.current = true;
      const id = user.id;
      setUser({ id });
      window.location.reload();
    });
  }, [setUser, user.id]);

  const { height } = useChangeSize();

  return (
    <Box>
      <Header height={60} p="xs" sx={{ position: 'fixed', zIndex: 2 }}>
        <Brand />
      </Header>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          overflow: 'auto',
          height,
          zIndex: 1,
        }}
      >
        {(setting.menuOpened || !downSM) && (
          <Box className={classes.scrollArea}>
            <CustomNavbar />
          </Box>
        )}
        {setting.menuOpened && downSM && <Overlay zIndex={9} onClick={() => setSettingKeyValue('menuOpened', false)} />}
        <ScrollArea className={classes.container}>
          <Box className={classes.page}>
            <Space h={60} />
            <RootRouter />
          </Box>
          <Box className={classes.footerPlaceholder} />
          <Box className={classes.footer}>
            <Footer />
          </Box>
        </ScrollArea>
      </Box>
    </Box>
  );
}
