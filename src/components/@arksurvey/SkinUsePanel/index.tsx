import { Box, createStyles, Group } from '@mantine/core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Character } from 'src/service/CharBoxServer';
import { CharSkinType } from 'src/components/@arksurvey/CharDataUnit';
import { RootState } from 'src/store';
import CharContainer from '../CharContainer';
import PanelContainer from '../PanelContainer';

const useStyles = createStyles((theme) => ({}));

interface LevelPanelProps {
  data: Character;
  selectedSkinKey: string;
  onSelectChange?: (key: string) => void;
}

export default function Index({ data, selectedSkinKey, onSelectChange }: LevelPanelProps) {
  const { charData } = useSelector((state: RootState) => state.user);

  const skinList = useMemo(() => {
    const charAllSkins = charData[data?.key]?.skins ?? [];
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
  }, [charData, data.key, data.skinUse, onSelectChange]);

  return (
    <PanelContainer>
      <Group sx={{ marginRight: '20px' }}>{skinList}</Group>
    </PanelContainer>
  );
}
