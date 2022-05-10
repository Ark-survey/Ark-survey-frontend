import { useState, useCallback, useEffect } from "react";

export function useChangeSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return (() => {
      window.removeEventListener('resize', onResize)
    })
  }, [onResize])

  return size;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const ua = navigator.userAgent.toLowerCase();
  const agents = ['iphone', 'ipad', 'ipod', 'android', 'linux', 'windows phone']; // 所有可能是移动端设备的字段

  useEffect(() => {
    for (let i = 0; i < agents.length; i++) {
      if (ua.indexOf(agents[i]) !== -1) {
        setIsMobile(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMobile
}