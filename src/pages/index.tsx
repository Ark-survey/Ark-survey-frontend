import { Box, createStyles } from '@mantine/core';
import Footer from 'src/components/Footer';
import Nav from 'src/components/Nav';
import TierList from './tier-list';

const useStyles = createStyles((theme, _params, getRef) => ({
  container: { minWidth: '360px' },
  page: {
    width: '100%',
    position: 'relative',
    zIndex: 1,
    minHeight: '100vh',
    background: theme.white,
    boxShadow: `0 0 5px 5px rgb(0 0 0 / 15%)`,
  },
  footerPlaceholder: {
    height: '140px',
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      height: '200px',
    },
  },
  footer: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1],
    position: 'fixed',
    bottom: 0,
    width: '100vw',
  },
}));

export default function PageContainer() {
  const { classes, cx } = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.page}>
        <Nav />
        <TierList />
      </Box>
      <Box className={classes.footerPlaceholder} />
      <Box className={cx(classes.footer, classes.footerPlaceholder)}>
        <Footer />
      </Box>
    </Box>
  );
}
