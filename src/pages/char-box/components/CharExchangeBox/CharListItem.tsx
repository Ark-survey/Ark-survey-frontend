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
  const filters = useSelector((state: RootState) => state.filters);

  const handleCharacterSelect = (value: boolean) => {
    if (value) onSelect?.(character?.key ?? '');
    else onSelectCancel?.(character?.key ?? '');
  };

  return (
    <CharContainer
      nameDisplay={filters.nameDisplay}
      charKey={character?.key ?? ''}
      charName={character?.name ?? ''}
      mini={filters.mini}
      selecting={selecting}
      dragDisabled
      sx={{ zIndex: 0 }}
      onSelectChange={handleCharacterSelect}
    />
  );
}
