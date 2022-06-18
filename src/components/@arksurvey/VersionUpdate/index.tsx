import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import * as serviceWorkerRegistration from 'src/serviceWorkerRegistration';

interface ImageContainerProps {
  url: string;
  originWidth: number;
  width?: number;
  flowWidthRef?: HTMLDivElement;
  position?: [number, number];
}

// 等比缩放
// 使用 flowWidthRef 的时候会忽略 width，跟随指定元素的宽度
export default function Index({ url, width, originWidth, flowWidthRef, position }: ImageContainerProps) {}
