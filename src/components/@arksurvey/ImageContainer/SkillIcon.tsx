import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import ImageContainer from '.';

interface HeaderProps {
  imgKey: string;
  width?: number;
  flowWidthRef?: HTMLDivElement;
}

export default function SkillIcon({ imgKey, width = 64, flowWidthRef }: HeaderProps) {
  const { skillImgPosition } = useSelector((state: RootState) => state.user.imgPosition);
  return (
    <ImageContainer
      url="https://img.yituliu.site/static/skill_0.5.webp"
      width={width}
      originWidth={64}
      flowWidthRef={flowWidthRef}
      position={skillImgPosition['skill_icon_' + imgKey]}
    />
  );
}
