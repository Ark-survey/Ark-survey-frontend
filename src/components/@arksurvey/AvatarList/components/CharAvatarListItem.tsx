import CharAvatar from 'src/components/@arksurvey/CharAvatar';
import { CharacterType, useSetting } from 'src/pages/store';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

interface CharListItemProps {
  character?: CharacterType;
  selected: boolean;
  onClick?: () => void;
}

export default function Index({ character, selected, onClick }: CharListItemProps) {
  const { setting } = useSetting();

  return (
    <CharAvatar
      nameDisplay={setting.nameDisplay}
      avatarKey={character?.key ?? ''}
      nameValue={character?.name ?? ''}
      mini={setting.mini}
      selected={selected}
      sx={{ zIndex: 0 }}
      onClick={onClick}
    />
  );
}
