import { Box, createStyles, Header, ScrollArea, Space, Overlay } from '@mantine/core';
import Footer from 'src/components/Footer';
import CustomNavbar from 'src/components/CustomNavbar';
import { RootState } from 'src/store';
import { Brand } from 'src/components/Brand';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuOpen } from 'src/store/slice/userSlice';
import { useChangeSize, useWindowSize } from 'src/hooks';
import { useEffect } from 'react';
import { RootRouter } from './route';
import { useLoadingGlobalData } from 'src/hooks/useLoadingGlobalData';
import { useLoadUserTierLists } from 'src/hooks/useLoadUserTierLists';
import { useCreateLocalTierList } from 'src/hooks/useCreateLocalTierList';
import { useLoadStaticFile } from 'src/hooks/useLoadStaticFile';
import { UpdateVersionNotion } from 'src/registrationStatus';

const useStyles = createStyles((theme, { menuOpen }: { menuOpen: boolean }, getRef) => ({
  container: {
    width: 'calc(100vw - 160px)',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      position: 'fixed',
      width: '100vw',
    },
  },
  page: {
    position: 'relative',
    width: '100%',
    background: theme.white,
    zIndex: 200,
    boxShadow: `0 0 5px 5px rgb(0 0 0 / 15%)`,
    minHeight: '100vh',
  },
  footerPlaceholder: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1],
    position: 'relative',
    height: '140px',
    zIndex: -200,
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      height: '200px',
    },
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    boxSizing: 'border-box',
    paddingLeft: 160,
    width: '100vw',
    height: '140px',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingLeft: 0,
    },
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      paddingLeft: 0,
      height: '200px',
    },
  },
  scrollArea: {
    width: '160px',
    height: '100%',
    background: '#fff',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 200,
    overflow: 'auto',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      position: 'fixed',
    },
  },
}));

const scaleY = {
  in: { opacity: 1, transform: 'scaleX(1)' },
  out: { opacity: 0, transform: 'scaleX(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

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

  const { height } = useChangeSize();

  return (
    <Box>
      <UpdateVersionNotion />
      <Header height={60} p="xs" sx={{ position: 'fixed', zIndex: 200 }}>
        <Brand />
      </Header>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          overflow: 'auto',
          height,
          zIndex: 100,
        }}
      >
        {(user.menuOpen || !downSM) && (
          <Box className={classes.scrollArea}>
            <CustomNavbar />
          </Box>
        )}
        {user.menuOpen && downSM && <Overlay zIndex={9} onClick={() => dispatch(updateMenuOpen(false))} />}
        <Box className={classes.container}>
          <Box className={classes.page}>
            <Space h={60} />
            <RootRouter />
          </Box>
          <Box className={classes.footerPlaceholder} />
          <Box className={classes.footer}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
