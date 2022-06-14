import { Overlay, ScrollArea } from '@mantine/core';
import { useDrop } from 'react-dnd';
import CharacterList from './components/CharList';
import { CharDragItem, ItemTypes } from './components/CharListItem';

import { updateCharacterPicked } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { useMemo, useState } from 'react';
import { filterChar } from 'src/store/slice/filterSlice';
import { mapToArray } from 'src/utils/ObjectUtils';

export default function CharListItemType() {
  const charData = useSelector((state: RootState) => mapToArray(state.user.charData));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { delTierOneChar, findTierIndexByValue } = useOperateEditingTierList();
  const filterCharFunc = useSelector((state: RootState) => filterChar(state));
  const [charsSelect, setCharsSelect] = useState<string[]>([]);

  const charsFilter = useMemo(
    () =>
      charData.filter((it) => {
        if (it.isNotObtainable || !filterCharFunc(it)) return false;
        return true;
      }),
    [charData, filterCharFunc],
  );

  const handleCharacterReturn = ({ fromTierValue, charKey }: CharDragItem) => {
    dispatch(updateCharacterPicked({ key: charKey ?? '', picked: false }));
    if (fromTierValue !== undefined) delTierOneChar(findTierIndexByValue(fromTierValue) ?? 0, charKey ?? '');
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.OPERATOR,
    drop: handleCharacterReturn,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <ScrollArea ref={drop} sx={{ height: '600px' }}>
      {isOver && (
        <Overlay
          opacity={0.6}
          color="#000"
          zIndex={600}
          sx={{
            color: '#fff',
            display: 'flex',
            fontSize: isOver ? '24px' : '30px',
            fontWeight: 600,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {t('drag-it-here-and-put-it-back')}
        </Overlay>
      )}
      <CharacterList
        filterCharData={charsFilter}
        selectKeys={charsSelect}
        onSelect={(key) => {
          setCharsSelect([...charsSelect, key]);
        }}
        onSelectCancel={(key) => setCharsSelect((c) => c.filter((i) => i !== key))}
      />
    </ScrollArea>
  );
}
