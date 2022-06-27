import CharContainer from 'src/components/@arksurvey/CharContainer';
import { useSetting } from 'src/pages/store';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

interface CharListItemProps<T> {
  data?: T;
  selecting: boolean;
  onSelect: (key: string) => void;
  onSelectCancel: (key: string) => void;
}

export default function Index<T extends { skinKey: string }>({
  data,
  selecting,
  onSelect,
  onSelectCancel,
}: CharListItemProps<T>) {
  const { setting } = useSetting();

  const handleCharacterSelect = (value: boolean) => {
    if (value) onSelect?.(data?.skinKey ?? '');
    else onSelectCancel?.(data?.skinKey ?? '');
  };

  return (
    <CharContainer
      // nameDisplay={setting.nameDisplay}
      charKey={data?.skinKey ?? ''}
      // charName={data?.name ?? ''}
      mini={setting.mini}
      selecting={selecting}
      dragDisabled
      sx={{ zIndex: 0 }}
      onSelectChange={handleCharacterSelect}
    />
  );
}
