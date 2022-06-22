import { useDataMap } from 'src/pages/store';
import ImageContainer from '.';

interface HeaderProps {
  imgKey: string;
  width?: number;
  flowWidthRef?: HTMLDivElement;
}

export default function SkillIcon({ imgKey, width = 64, flowWidthRef }: HeaderProps) {
  const { imgPositionMap } = useDataMap();

  return (
    <ImageContainer
      url="https://img.yituliu.site/static/skill_0.5.webp"
      width={width}
      originWidth={64}
      flowWidthRef={flowWidthRef}
      position={imgPositionMap.skillImgPosition['skill_icon_' + imgKey]}
    />
  );
}
