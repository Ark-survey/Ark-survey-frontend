import { createStyles, Group } from '@mantine/core';
import { useMemo } from 'react';
import { Character } from 'src/service/CharBoxServer';
import CharContainer from '../CharContainer';
import PanelContainer from '../PanelContainer';
import { useDataMap } from 'src/pages/store';

const useStyles = createStyles((theme) => ({}));

interface LevelPanelProps {
  data: Character;
  selectedSkinKey: string;
  onSelectChange?: (key: string) => void;
}

export default function Index({ data, selectedSkinKey, onSelectChange }: LevelPanelProps) {
  const { charMap } = useDataMap();

  const skinList = useMemo(() => {
    const charAllSkins = charMap[data?.key]?.skins ?? [];
    // const skins = Object.values(charData).filter((it) => it.key);
    return Object.keys(charAllSkins).map((key) => {
      return (
        <CharContainer
          key={key}
          charKey={key}
          onSelectChange={() => onSelectChange?.(key)}
          sx={{ background: data.skinUse === key ? 'yellow' : undefined }}
          dragDisabled
        />
      );
    });
  }, [charMap, data?.key, data.skinUse, onSelectChange]);

  return (
    <PanelContainer>
      <Group sx={{ marginRight: '20px' }}>{skinList}</Group>
    </PanelContainer>
  );
}
