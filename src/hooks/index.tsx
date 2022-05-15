import { useState, useCallback, useEffect, useMemo } from 'react';

export function useChangeSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const ua = navigator.userAgent.toLowerCase();
  const agents = useMemo(() => ['iphone', 'ipad', 'ipod', 'android', 'linux', 'windows phone'], []); // 所有可能是移动端设备的字段

  useEffect(() => {
    agents.forEach((value) => {
      if (ua.indexOf(value) !== -1) {
        setIsMobile(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMobile;
}
