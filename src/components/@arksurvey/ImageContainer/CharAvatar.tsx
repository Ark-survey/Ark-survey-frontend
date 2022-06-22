import { useDataMap } from 'src/pages/store';
import ImageContainer from '.';

interface HeaderProps {
  imgKey: string;
  width?: number;
  flowWidthRef?: HTMLDivElement;
}

export default function CharAvatar({ imgKey, width = 90, flowWidthRef }: HeaderProps) {
  const { imgPositionMap } = useDataMap();
  return (
    <ImageContainer
      url="https://img.yituliu.site/static/char_0.5.webp"
      width={width}
      originWidth={90}
      flowWidthRef={flowWidthRef}
      position={imgPositionMap.avatarImgPosition[imgKey]}
    />
  );
}
