import { Box } from '@mantine/core';
import { ReactNode, useMemo } from 'react';
import DeleteTier from './DeleteTierPopover';
import EditTierPopover from './EditTierPopover';
import { useDrop } from 'react-dnd';
import { ItemTypes } from 'src/common';
import CharListItem, { CharDragItem, CharListItemType } from 'src/pages/tier-list/CharListBox/components/CharListItem';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import AddCharactersToTierPopover from './AddCharactersToTierPopover';
import { Tier } from 'src/api/TierListServer';
import { mapToArray } from 'src/utils/ObjectUtils';

/**
 * @param value tier value
 */
interface TierBoxProps {
  tier: Tier;
  operationDisplay?: boolean;
  onDropCharacter: (item: CharDragItem) => void;
}

export default function TierBox({ tier, operationDisplay = false, onDropCharacter }: TierBoxProps) {
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const filter = useSelector((state: RootState) => state.filters);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.OPERATOR,
    drop: onDropCharacter,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const characterIMgList = useMemo(() => {
    const characterList = mapToArray(charMap).filter(
      (character) => tier.characterKeys.indexOf(character?.key ?? '') > -1,
    );
    let cache: ReactNode[] = [];
    characterList.forEach((value) => {
      cache.push(
        <CharListItem key={value.key} character={value} fromTierValue={tier.value} type={CharListItemType.TIER} />,
      );
    });
    return cache;
  }, [charMap, tier.characterKeys, tier.value]);

  return (
    <Box
      ref={drop}
      sx={{
        boxSizing: 'border-box',
        width: 'calc(100% - 20px)',
        border: isOver ? '2px #aaa solid' : '2px #ccc dashed',
        borderRadius: '20px',
        minHeight: filter.mini ? '75px' : '115px',
        position: 'relative',
        margin: '0 10px',
        marginBottom: '20px',
        marginTop: '5px',
      }}
    >
      <Box sx={{ padding: '10px', display: 'flex', flexFlow: 'row wrap' }}>{characterIMgList}</Box>
      <Box
        sx={{
          position: 'absolute',
          background: '#fff',
          fontWeight: 600,
          fontSize: '12px',
          padding: '2px 5px',
          top: '-12px',
          left: '20px',
        }}
      >
        {(tier?.name?.length ?? 0) > 0 ? tier.name : 'T ' + tier.value}
      </Box>
      {operationDisplay && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: filter.mini ? '-10px' : '12px',
              left: filter.mini ? '' : '-10px',
              right: filter.mini ? '20px' : '',
              display: filter.mini ? 'flex' : '',
              zIndex: 1,
            }}
          >
            <AddCharactersToTierPopover tierValue={tier.value ?? 0} />
            <Box sx={{ width: '6px', height: '4px' }} />
            <EditTierPopover tier={tier} />
            <Box sx={{ width: '6px', height: '4px' }} />
            <DeleteTier tierValue={tier.value ?? 0} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              fontSize: '40px',
              right: '20px',
              lineHeight: filter.mini ? '75px' : '110px',
              fontWeight: 900,
              color: '#eee',
              top: 0,
              zIndex: 0,
              WebkitTextStroke: isOver ? '2px #ccc' : '2px #eee',
              WebkitTextFillColor: isOver ? '' : 'transparent',
            }}
          >
            {(tier?.name?.length ?? 0) > 0 ? tier.name : 'T ' + tier.value}
          </Box>
        </>
      )}
    </Box>
  );
}
