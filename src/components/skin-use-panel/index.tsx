import { Box, createStyles, Group } from '@mantine/core';
import { useMemo } from 'react';
import { CharSkinType } from 'src/components/CharDataUnit';
import CharContainer from '../char-container';
import PanelContainer from '../PanelContainer';

const useStyles = createStyles((theme) => ({}));

interface LevelPanelProps {
  skins: { [key: string]: CharSkinType };
  selectedSkinKey: string;
  onSelectChange?: (key: string) => void;
}

export default function Index({ skins, selectedSkinKey, onSelectChange }: LevelPanelProps) {
  const skinList = useMemo(() => {
    return Object.keys(skins).map((key) => {
      return (
        <CharContainer
          key={key}
          charKey={key}
          onSelectChange={() => {
            console.log(key);
          }}
          dragDisabled
        />
      );
    });
  }, [skins]);

  return (
    <PanelContainer>
      <Box sx={{ width: 500 }}>
        <Group>{skinList}</Group>
      </Box>
    </PanelContainer>
  );
}
