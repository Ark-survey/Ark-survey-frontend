import CharContainer from 'src/components/@arksurvey/CharContainer';
import { CharacterType, useSetting } from 'src/pages/store';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

interface CharListItemProps {
  character?: CharacterType;
  selecting: boolean;
  onSelect: (key: string) => void;
  onSelectCancel: (key: string) => void;
}

export default function Index({ character, selecting, onSelect, onSelectCancel }: CharListItemProps) {
  const { setting } = useSetting();

  const handleCharacterSelect = (value: boolean) => {
    if (value) onSelect?.(character?.key ?? '');
    else onSelectCancel?.(character?.key ?? '');
  };

  return (
    <CharContainer
      nameDisplay={setting.nameDisplay}
      charKey={character?.key ?? ''}
      charName={character?.name ?? ''}
      mini={setting.mini}
      selecting={selecting}
      dragDisabled
      sx={{ zIndex: 0 }}
      onSelectChange={handleCharacterSelect}
    />
  );
}
