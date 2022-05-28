import { Box, Overlay } from '@mantine/core';
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
  const filterHeight = useSelector(filterHeightState);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { delTierOneChar, findTierIndexByValue } = useOperateEditingTierList();

  const size = useChangeSize();

  const handleCharacterReturn = ({ fromTierValue, character }: CharDragItem) => {
    dispatch(updateCharacterPicked({ key: character?.key ?? '', picked: false }));
    if (fromTierValue !== undefined) delTierOneChar(findTierIndexByValue(fromTierValue) ?? 0, character?.key ?? '');
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.OPERATOR,
    drop: handleCharacterReturn,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box
      ref={drop}
      sx={{
        maxHeight: size.width < 720 ? (filters.mini ? '160px' : '600px') : '',
        height: filters.fold
          ? 'calc(100% - 85px - ' + filterHeight + 'px)'
          : 'calc(100% -  85px - ' + filterHeight + 'px)',
        margin: '0 13px',
        overflow: 'hidden',
        transition: 'all 1s',
        // border: '2px #ccc solid',
        borderRadius: '0 0 20px 20px',
        position: 'relative',
      }}
    >
      {isOver && (
        <Overlay
          opacity={0.6}
          color="#000"
          zIndex={6}
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
      <Box
        sx={{
          height: '100%',
          '::-webkit-scrollbar': { width: '0 !important' },
          overflow: 'auto',
        }}
      >
        <CharacterList />
      </Box>
    </Box>
  );
}
