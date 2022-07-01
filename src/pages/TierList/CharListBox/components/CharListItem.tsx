import { useState } from 'react';
import DraggableCharContainer, { CharContainerType } from 'src/components/@arksurvey/CharAvatar/AvatarFactory';
import { CharacterType, useSetting } from 'src/pages/store';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

interface CharListItemProps {
  character?: CharacterType;
  type?: CharContainerType;
  fromTierValue?: number;
  hidden?: boolean;
  selecting?: boolean;
  charStatus?: 'picked' | 'default';
  onSelect?: (key: string) => void;
  onSelectCancel?: (key: string) => void;
  onDelete?: () => void;
}

export interface CharDragItem {
  type?: CharContainerType;
  charKey?: string;
  fromTierValue?: number;
}

export default function Index({
  character,
  hidden,
  type,
  fromTierValue,
  selecting,
  charStatus = 'default',
  onSelect,
  onSelectCancel,
  onDelete,
}: CharListItemProps) {
  const { setting } = useSetting();

  const [delSelect, setDelSelect] = useState(false);

  const handleCharacterSelect = (value: boolean) => {
    if (type === 'tier-list') {
      setDelSelect(value);
      return;
    }
    if (value) onSelect?.(character?.key ?? '');
    else onSelectCancel?.(character?.key ?? '');
  };

  return (
    <DraggableCharContainer
      nameDisplay={setting.nameDisplay}
      charKey={character?.key ?? ''}
      charName={character?.name ?? ''}
      mini={setting.mini}
      charStatus={charStatus}
      type={type}
      hidden={hidden}
      selecting={selecting || delSelect}
      onSelectChange={handleCharacterSelect}
      onDelete={onDelete}
      metaInfo={{
        fromTierValue,
      }}
    />
  );
}
