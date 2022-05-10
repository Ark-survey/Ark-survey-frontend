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