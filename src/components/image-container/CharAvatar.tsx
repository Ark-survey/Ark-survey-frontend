import { useSelector } from 'react-redux';
import { useLoadStaticFile } from 'src/hooks/useLoadStaticFile';
import { RootState } from 'src/store';
import ImageContainer from '.';

interface HeaderProps {
  imgKey: string;
  width?: number;
  flowWidthRef?: HTMLDivElement;
}

export default function CharAvatar({ imgKey, width = 90, flowWidthRef }: HeaderProps) {
  const { avatarImgPosition } = useSelector((state: RootState) => state.user.imgPosition);
  return (
    <ImageContainer
      url="https://arksurvey-1258424659.cos.ap-shanghai.myqcloud.com/static/avatar_0.5.webp"
      width={width}
      originWidth={90}
      flowWidthRef={flowWidthRef}
      position={avatarImgPosition[imgKey]}
    />
  );
}
