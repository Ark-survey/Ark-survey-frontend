import CharContainer, { CharContainerType } from 'src/components/@arksurvey/CharContainer';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
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
}: CharListItemProps) {
  const { setting } = useSetting();
  const { delTierOneChar, findTierIndexByValue } = useOperateEditingTierList();

  const handleCharacterDelete = () => {
    delTierOneChar(findTierIndexByValue(fromTierValue ?? 0) ?? 0, character?.key ?? '');
  };

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
      charStatus={charStatus}
      type={type}
      hidden={hidden}
      selecting={selecting}
      onSelectChange={handleCharacterSelect}
      onDelete={handleCharacterDelete}
      metaInfo={{
        fromTierValue,
      }}
    />
  );
}
