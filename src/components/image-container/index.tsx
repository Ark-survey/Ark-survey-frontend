import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';

interface ImageContainerProps {
  url: string;
  originWidth: number;
  width?: number;
  flowWidthRef?: HTMLDivElement;
  position?: [number, number];
}

// 等比缩放
// 使用 flowWidthRef 的时候会忽略 width，跟随指定元素的宽度
export default function Index({ url, width, originWidth, flowWidthRef, position }: ImageContainerProps) {
  const [flowWidth, setFlowWidth] = useState<number>();

  useEffect(() => {
    let resizeObserver: any;
    if (flowWidthRef) {
      resizeObserver = new ResizeObserver(() => {
        setFlowWidth(flowWidthRef?.clientWidth);
      });
      resizeObserver.observe(flowWidthRef);
    }
    return () => {
      if (flowWidthRef) resizeObserver.disconnect();
    };
  }, [flowWidthRef]);

  return position ? (
    <Box
      sx={{
        width: flowWidth ?? width,
        height: flowWidth ?? width,
        position: 'relative',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          transform: 'scale(' + (flowWidth ?? width ?? 0) / originWidth + ')',
          position: 'absolute',
          top: ((flowWidth ?? width ?? 0) - originWidth) / 2,
          left: ((flowWidth ?? width ?? 0) - originWidth) / 2,
          width: originWidth + 'px',
          height: originWidth + 'px',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(' + url + ')',
          backgroundPosition: position[0] + 'px ' + position[1] + 'px',
        }}
      />
    </Box>
  ) : null;
}
