import { useState, useEffect, useMemo } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const ua = navigator.userAgent.toLowerCase();
  const agents = useMemo(() => ['iphone', 'ipad', 'ipod', 'android', 'linux', 'windows phone'], []);

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
