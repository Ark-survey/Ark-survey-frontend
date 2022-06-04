import { Box, createStyles, Paper } from '@mantine/core';
import { ReactNode, useEffect, useRef } from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    background: theme.white,
    borderRadius: '10px',
    width: 335,
    padding: '15px',
    boxSizing: 'border-box',
    overflow: 'auto',
    '::-webkit-scrollbar': { display: 'none' },
  },
}));

interface LevelPanelProps {
  children: ReactNode;
}

export default function Index({ children }: LevelPanelProps) {
  const { classes, cx } = useStyles();
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = boxRef.current?.addEventListener('wheel', (event) => {
      event.preventDefault();
      boxRef.current && (boxRef.current.scrollLeft += event.deltaY / 10);
    });

    return () => {
      if (listener) removeEventListener('wheel', listener);
    };
  }, []);

  return (
    <Paper ref={boxRef} className={classes.container} shadow="md" radius="lg" p="lg" withBorder>
      {children}
    </Paper>
  );
}
