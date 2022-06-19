import { Box, Center } from '@mantine/core';
import { ReactNode, useMemo } from 'react';
import DeleteTier from './DeleteTierPopover';
import EditTierPopover from './EditTierPopover';
import { useDrop } from 'react-dnd';
import CharListItem, { CharDragItem } from 'src/pages/TierList/CharListBox/components/CharListItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Tier } from 'src/service/TierListServer';
import { mapToArray } from 'src/utils/ObjectUtils';
import { editingTierList } from 'src/store/slice/TierListSlice';
import CharContainer, { ItemTypes } from 'src/components/@arksurvey/CharContainer';
import { IconPlus } from '@tabler/icons';
import { t } from 'i18next';
import { updateCharacterPicked, updateCharacterSelecting } from 'src/store/slice/characterSlice';
import { successNotice } from '../../../../components/Notice';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';

/**
 * @param value tier value
 */
interface TierBoxProps {
  tier: Tier;
  operationDisplay?: boolean;
  onDropCharacter: (item: CharDragItem) => void;
}

export default function TierBox({ tier, operationDisplay = false, onDropCharacter }: TierBoxProps) {
  const tierList = useSelector(editingTierList);
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const setting = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const { addTierChars, findTierIndexByValue } = useOperateEditingTierList();

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.OPERATOR,
      drop: onDropCharacter,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [onDropCharacter, tierList.tiers],
  );

  const characterImgList = useMemo(() => {
    const characterList = mapToArray(charMap).filter(
      (character) => tier.characterKeys.indexOf(character?.key ?? '') > -1,
    );
    let cache: ReactNode[] = [];
    characterList.forEach((value) => {
      cache.push(<CharListItem key={value.key} character={value} fromTierValue={tier.value} type="tier-list" />);
    });
    return cache;
  }, [charMap, tier.characterKeys, tier.value]);

  const addCharacter = useMemo(() => {
    const addList: string[] = [];
    Object.keys(charMap).forEach((key) => {
      if (charMap[key].selecting) {
        addList.push(key);
      }
    });
    if (addList.length > 0) {
      return (
        <CharContainer
          mini={setting.mini}
          sx={{
            margin: '5px',
          }}
        >
          <Center
            sx={{ height: '100%', cursor: 'pointer' }}
            onClick={() => {
              addList.forEach((key) => {
                dispatch(updateCharacterPicked({ key, picked: true }));
                dispatch(updateCharacterSelecting({ key, selecting: false }));
              });
              addTierChars(findTierIndexByValue(tier.value ?? 0) ?? 0, addList);
              successNotice(t('bulk-added-successfully'));
            }}
          >
            <IconPlus color="grey" />
          </Center>
        </CharContainer>
      );
    }
  }, [addTierChars, charMap, dispatch, setting.mini, findTierIndexByValue, tier.value]);

  return (
    <Box
      ref={drop}
      sx={{
        boxSizing: 'border-box',
        border: isOver ? '2px #aaa solid' : '2px #ccc dashed',
        borderRadius: '20px',
        minHeight: setting.mini ? '75px' : '115px',
        position: 'relative',
        margin: '5px',
        padding: '5px',
      }}
    >
      <Box sx={{ padding: '10px', display: 'flex', flexFlow: 'row wrap' }}>
        {characterImgList}
        {addCharacter}
      </Box>
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
              top: setting.mini ? '-10px' : '12px',
              left: setting.mini ? '' : '-10px',
              right: setting.mini ? '20px' : '',
              display: setting.mini ? 'flex' : '',
              zIndex: 1,
            }}
          >
            {/* <AddCharactersToTierPopover tierValue={tier.value ?? 0} />
            <Box sx={{ width: '6px', height: '4px' }} /> */}
            <EditTierPopover tier={tier} />
            <Box sx={{ width: '6px', height: '4px' }} />
            <DeleteTier tierValue={tier.value ?? 0} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              fontSize: '40px',
              right: '20px',
              lineHeight: setting.mini ? '75px' : '110px',
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
