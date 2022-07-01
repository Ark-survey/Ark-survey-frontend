import { useDataMap } from 'src/pages/store';
import ImageContainer from './ImageContainer';

export const imgMetaData = {
  avatar: {
    url: 'https://img.yituliu.site/static/char_0.5.webp',
    size: 90,
  },
  skill: {
    url: 'https://img.yituliu.site/static/skill_0.5.webp',
    size: 64,
  },
  equip: {
    url: 'https://img.yituliu.site/static/uniequip_0.5.webp',
    size: 256,
  },
};

export type ImgMetaDataKey = keyof typeof imgMetaData;

export interface ImageSpriteProps {
  type: ImgMetaDataKey;
  imgKey: string;
  width?: number;
  flowWidthRef?: HTMLDivElement;
}

export default function ImageSprite({ type, imgKey, width = imgMetaData[type].size, flowWidthRef }: ImageSpriteProps) {
  const { imgPositionMap } = useDataMap();
  return (
    <ImageContainer
      url={imgMetaData[type].url}
      width={width}
      originWidth={imgMetaData[type].size}
      flowWidthRef={flowWidthRef}
      position={imgKey ? imgPositionMap[type][imgKey] : undefined}
    />
  );
}
