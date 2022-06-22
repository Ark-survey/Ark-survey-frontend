import { useDataMap } from 'src/pages/store';
import ImageContainer from '.';

interface HeaderProps {
  imgKey: string;
  width?: number;
  flowWidthRef?: HTMLDivElement;
}

export default function UniEquipImg({ imgKey, width = 256, flowWidthRef }: HeaderProps) {
  const { imgPositionMap } = useDataMap();

  return (
    <ImageContainer
      url="https://img.yituliu.site/static/uniequip_0.5.webp"
      width={width}
      originWidth={256}
      flowWidthRef={flowWidthRef}
      position={imgPositionMap.uniEquipImgPosition[imgKey]}
    />
  );
}
