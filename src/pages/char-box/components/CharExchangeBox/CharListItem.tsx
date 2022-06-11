import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import CharContainer from 'src/components/char-container';
import { CharacterType } from 'src/store/slice/userSlice';

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
  const setting = useSelector((state: RootState) => state.setting);

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
