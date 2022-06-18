import { Box, createStyles, Header, ScrollArea, Space, Overlay } from '@mantine/core';
import Footer from 'src/components/Footer';
import CustomNavbar from 'src/components/CustomNavbar';
import { persistor, RootState } from 'src/store';
import { Brand } from 'src/components/Brand';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuOpen, updateUserData } from 'src/store/slice/userSlice';
import { useChangeSize, useWindowSize } from 'src/hooks/useIsMobile';
import { useEffect, useRef } from 'react';
import { RootRouter } from './route';
import { useLoadingGlobalData } from 'src/hooks/useLoadingGlobalData';
import { useLoadUserTierLists } from 'src/hooks/useLoadUserTierLists';
import { useCreateLocalTierList } from 'src/hooks/useCreateLocalTierList';
import { useLoadStaticFile } from 'src/hooks/useLoadStaticFile';
import { UpdateVersionNotion } from 'src/registrationStatus';

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
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { classes, cx } = useStyles({ menuOpen: user.menuOpen });

  useCreateLocalTierList();
  useLoadingGlobalData();
  useLoadUserTierLists();
  useLoadStaticFile();

  useEffect(() => {
    if (downSM) dispatch(updateMenuOpen(false));
    else {
      dispatch(updateMenuOpen(true));
    }
  }, [dispatch, downSM]);

  const refreshing = useRef(false);
  useEffect(() => {
    navigator.serviceWorker.addEventListener('controllerchange', async () => {
      if (refreshing.current) {
        return;
      }
      refreshing.current = true;
      const id = user.userData?.id ?? '';
      await persistor.flush();
      dispatch(updateUserData({ id }));
      window.location.reload();
    });
  }, [dispatch, user.userData?.id]);

  const { height } = useChangeSize();

  return (
    <Box>
      <UpdateVersionNotion />
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
        {(user.menuOpen || !downSM) && (
          <Box className={classes.scrollArea}>
            <CustomNavbar />
          </Box>
        )}
        {user.menuOpen && downSM && <Overlay zIndex={9} onClick={() => dispatch(updateMenuOpen(false))} />}
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
