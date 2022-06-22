import { Overlay, ScrollArea } from '@mantine/core';
import { useDrop } from 'react-dnd';
import CharacterList from './components/CharList';
import { CharDragItem, ItemTypes } from './components/CharListItem';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { useMemo } from 'react';
import { mapToArray } from 'src/utils/ObjectUtils';
import { useCharBoxSelectKeys } from '../store';
import { CharacterType, useDataMap } from 'src/pages/store';

export default function CharListItemType({ filterChar }: { filterChar: (char: CharacterType) => boolean }) {
  const { charMap } = useDataMap();
  const { t } = useTranslation();
  const { delTierOneChar, findTierIndexByValue } = useOperateEditingTierList();

  // zustand
  const selectKeys = useCharBoxSelectKeys((state) => state.selectKeys);
  const addSelectKeys = useCharBoxSelectKeys((state) => state.addSelectKeys);
  const delSelectKeys = useCharBoxSelectKeys((state) => state.delSelectKeys);

  const charsFilter = useMemo(
    () =>
      mapToArray(charMap).filter((it) => {
        if (it.isNotObtainable || !filterChar(it)) return false;
        return true;
      }),
    [charMap, filterChar],
  );

  const handleCharacterReturn = ({ fromTierValue, charKey }: CharDragItem) => {
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
        selectKeys={selectKeys}
        onSelect={(key) => addSelectKeys([key])}
        onSelectCancel={(key) => delSelectKeys([key])}
      />
    </ScrollArea>
  );
}
