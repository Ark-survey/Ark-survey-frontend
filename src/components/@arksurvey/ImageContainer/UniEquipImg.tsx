import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import ImageContainer from '.';

interface HeaderProps {
  imgKey: string;
  width?: number;
  flowWidthRef?: HTMLDivElement;
}

export default function UniEquipImg({ imgKey, width = 256, flowWidthRef }: HeaderProps) {
  const { uniEquipImgPosition } = useSelector((state: RootState) => state.user.imgPosition);
  return (
    <ImageContainer
      url="https://img.yituliu.site/static/uniequip_0.5.webp"
      width={width}
      originWidth={256}
      flowWidthRef={flowWidthRef}
      position={uniEquipImgPosition[imgKey]}
    />
  );
}
