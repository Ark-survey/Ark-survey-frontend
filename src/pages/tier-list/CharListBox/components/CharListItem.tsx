import { Box, Image, Overlay } from '@mantine/core';
import { ItemTypes } from 'src/common';
import { useDrag } from 'react-dnd';
import { RootState } from 'src/store';
import { CharacterType, updateCharacterSelecting } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useIsMobile } from 'src/hooks';
import { useMemo } from 'react';

export enum CharListItemType {
  NORMAL,
  TIER,
}

interface CharListItemProps {
  character?: CharacterType;
  type?: CharListItemType;
  fromTierValue?: number;
  empty?: boolean;
}

export interface CharDragItem {
  type?: CharListItemType;
  character?: CharacterType;
  fromTierValue?: number;
}

export default function Index({ character, type, fromTierValue, empty }: CharListItemProps) {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const charDragItem: CharDragItem = { type, character, fromTierValue };
  const [{ isDragging }, dragger] = useDrag(
    () => ({
      type: ItemTypes.OPERATOR,
      item: charDragItem,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  );

  const handleCharacterSelect = () => {
    if (type === CharListItemType.NORMAL)
      dispatch(
        updateCharacterSelecting({
          key: character?.key ?? '',
          selecting: !character?.selecting,
        }),
      );
  };

  const overlay = useMemo(() => {
    return (
      (isDragging || (character?.picked && type === CharListItemType.NORMAL)) && (
        <Overlay
          opacity={0.6}
          color="#000"
          zIndex={5}
          sx={{
            color: '#fff',
            display: 'flex',
            fontWeight: 600,
            fontSize: filters.mini ? '10px' : '',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isDragging ? '拖动中' : '已选取'}
        </Overlay>
      )
    );
  }, [isDragging, filters.mini, character, type]);

  const name = useMemo(() => {
    return (
      filters.nameDisplay && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 4,
            bottom: filters.mini ? '' : '0',
            top: filters.mini ? '3px' : '',
            left: filters.mini ? '-10px' : '0px',
            width: filters.mini ? '150%' : '100%',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
            height: filters.mini ? '8px' : '14px',
            background:
              'linear-gradient(to top, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 90%, rgba(255,249,242,0) 100%)',
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: 700,
              height: filters.mini ? '10px' : '15px',
              transform: filters.mini ? 'scale(0.5)' : '',
            }}
          >
            {character?.name}
          </Box>
        </Box>
      )
    );
  }, [filters.nameDisplay, filters.mini, character]);

  return (
    <Box
      key={character?.id}
      ref={
        (character?.picked && type === CharListItemType.NORMAL) || (isMobile && type === CharListItemType.NORMAL)
          ? null
          : dragger
      }
      sx={{
        margin: empty ? '0 5px' : '5px',
        width: filters.mini ? 40 : 80,
        minHeight: !empty ? (filters.mini ? 40 : 80) : 0,
        boxSizing: 'border-box',
        boxShadow:
          character?.selecting && type === CharListItemType.NORMAL && !empty
            ? 'inset 0px 0px 10px 4px green'
            : 'inset 0px 0px 10px 4px #ccc',
        backgroundRepeat: 'no-repeat',
        borderRadius: filters.mini ? '50%' : '20px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        flex: type === CharListItemType.NORMAL ? 'auto' : '',
        height: empty ? '0' : 'auto',
        fontSize: 10,
      }}
    >
      {overlay}
      {name}
      <Image src={character?.imgUrl} width="80" height="80" alt={character?.name} onClick={handleCharacterSelect} />
    </Box>
  );
}
