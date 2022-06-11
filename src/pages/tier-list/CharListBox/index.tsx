import { Box, Overlay, ScrollArea } from '@mantine/core';
import { useDrop } from 'react-dnd';
import CharacterList from './components/CharList';
import { CharDragItem, ItemTypes } from './components/CharListItem';

import { updateCharacterPicked } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { filterHeightState } from 'src/store/slice/filterSlice';
import { useChangeSize } from 'src/hooks';
import { useTranslation } from 'react-i18next';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';

export default function CharListItemType() {
  const filters = useSelector((state: RootState) => state.filters);
  const setting = useSelector((state: RootState) => state.setting);
  const filterHeight = useSelector(filterHeightState);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { delTierOneChar, findTierIndexByValue } = useOperateEditingTierList();

  const { width } = useChangeSize();

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
    <ScrollArea ref={drop} sx={{ height: '370px' }}>
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
      <CharacterList />
    </ScrollArea>
  );
}
