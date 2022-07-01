import { createStyles, Group } from '@mantine/core';
import { useMemo } from 'react';
import { Character } from 'src/service/CharBoxServer';
import CharAvatar, { HasCharAvatar } from '../CharAvatar';
import PanelContainer from '../PanelContainer';
import { useDataMap } from 'src/pages/store';

interface LevelPanelProps {
  data: Character;
  charSkinKeys: string[];
  onSelectChange?: (key: string) => void;
}

export default function Index({ data, charSkinKeys, onSelectChange }: LevelPanelProps) {
  const { charMap } = useDataMap();

  const skinList = useMemo(() => {
    const charAllSkins = charMap[data?.key]?.skins ?? [];
    // const skins = Object.values(charData).filter((it) => it.key);
    return Object.keys(charAllSkins).map((key) => {
      const eliteFit =
        key === data.key ||
        (data.elite >= 1 && key === data.key + '_1') ||
        (data.elite >= 2 && key === data.key + '_2');
      const inSkinBox = charSkinKeys?.includes(key);

      return inSkinBox || eliteFit ? (
        <CharAvatar
          key={key}
          avatarKey={key}
          onClick={() => onSelectChange?.(key)}
          selected={data.skinUse === key}
          themeColor="yellow"
        />
      ) : (
        <HasCharAvatar key={key} avatarKey={key} />
      );
    });
  }, [charMap, charSkinKeys, data.elite, data.key, data.skinUse, onSelectChange]);

  return (
    <PanelContainer>
      <Group sx={{ marginRight: '20px' }}>{skinList}</Group>
    </PanelContainer>
  );
}
