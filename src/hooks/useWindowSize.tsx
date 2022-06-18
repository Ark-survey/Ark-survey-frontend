import { useMantineTheme } from '@mantine/core';
import { useState, useEffect } from 'react';

export function useWindowSize() {
  const theme = useMantineTheme();
  const getWindowSize = () => ({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const handleResize = () => {
    setWindowSize(getWindowSize());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downXS = windowSize.innerWidth <= theme.breakpoints.xs;
  const downSM = windowSize.innerWidth <= theme.breakpoints.sm;
  const downMD = windowSize.innerWidth <= theme.breakpoints.md;
  const downLG = windowSize.innerWidth <= theme.breakpoints.lg;
  const downXL = windowSize.innerWidth <= theme.breakpoints.xl;

  return { downXS, downSM, downMD, downLG, downXL };
}
