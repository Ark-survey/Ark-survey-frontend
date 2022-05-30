import { RootState } from 'src/store';
import { CharacterType, updateCharacterPicked, updateCharacterSelecting } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import CharContainer, { CharContainerType } from 'src/components/char-container';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

interface CharListItemProps {
  character?: CharacterType;
  type?: CharContainerType;
  fromTierValue?: number;
  hidden?: boolean;
}

export interface CharDragItem {
  type?: CharContainerType;
  charKey?: string;
  fromTierValue?: number;
}

export default function Index({ character, hidden, type, fromTierValue }: CharListItemProps) {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const [listPicking, setListPicking] = useState(false);
  const { delTierOneChar, findTierIndexByValue } = useOperateEditingTierList();

  const handleCharacterSelect = () => {
    if (type === 'default')
      dispatch(
        updateCharacterSelecting({
          key: character?.key ?? '',
          selecting: !character?.selecting,
        }),
      );
    else if (type === 'tier-list') {
      setListPicking((listPicking) => !listPicking);
    }
  };

  const handleCharacterDelete = () => {
    dispatch(
      updateCharacterPicked({
        key: character?.key ?? '',
        picked: false,
      }),
    );
    delTierOneChar(findTierIndexByValue(fromTierValue ?? 0) ?? 0, character?.key ?? '');
  };

  return (
    <CharContainer
      sx={{
        margin: '5px',
      }}
      charKey={character?.key ?? ''}
      mini={filters.mini}
      charStatus={character?.picked && type === 'default' ? 'picked' : 'default'}
      type={type}
      hidden={hidden}
      selecting={character?.selecting || (type === 'tier-list' && listPicking)}
      onSelectChange={handleCharacterSelect}
      onDelete={handleCharacterDelete}
      metaInfo={{
        fromTierValue,
      }}
    />
  );
}
