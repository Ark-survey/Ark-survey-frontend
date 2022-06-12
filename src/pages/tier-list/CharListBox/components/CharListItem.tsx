import { RootState } from 'src/store';
import { updateCharacterPicked } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import CharContainer, { CharContainerType } from 'src/components/char-container';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { CharacterType } from 'src/store/slice/userSlice';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

interface CharListItemProps {
  character?: CharacterType;
  type?: CharContainerType;
  fromTierValue?: number;
  hidden?: boolean;
  selecting?: boolean;
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
  onSelect,
  onSelectCancel,
}: CharListItemProps) {
  const setting = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const { delTierOneChar, findTierIndexByValue } = useOperateEditingTierList();

  const handleCharacterDelete = () => {
    dispatch(
      updateCharacterPicked({
        key: character?.key ?? '',
        picked: false,
      }),
    );
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
      charStatus={character?.picked && type === 'default' ? 'picked' : 'default'}
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
