import { Box, Center, Group, Title } from '@mantine/core';
import { useCallback, useMemo } from 'react';
import DeleteTier from './DeleteTierPopover';
import EditTierPopover from './EditTierPopover';
import { useDrop } from 'react-dnd';
import CharListItem, { CharDragItem } from 'src/pages/TierList/CharListBox/components/CharListItem';
import { Tier } from 'src/service/TierListServer';
import { mapToArray } from 'src/utils/ObjectUtils';
import DraggableCharContainer, { ItemTypes } from 'src/components/@arksurvey/CharContainer/DraggableCharContainer';
import { IconPlus } from '@tabler/icons';
import { useOperateEditingTierList } from 'src/hooks/useOperateEditingTierList';
import { useCharBoxSelectKeys } from '../../store';
import { useDataMap, useSetting } from 'src/pages/store';

/**
 * @param value tier value
 */
interface TierBoxProps {
  tier: Tier;
  operationDisplay?: boolean;
  tierValueList: number[];
  onDropCharacter: (item: CharDragItem) => void;
  onDeleteChar: () => void;
  onTierUpdate: (newTier: Tier) => void;
}

export default function TierBox({
  onDeleteChar,
  onTierUpdate,
  tierValueList,
  tier,
  operationDisplay = false,
  onDropCharacter,
}: TierBoxProps) {
  const { charMap } = useDataMap();
  const { setting } = useSetting();
  const { addTierChars, delTierOneChar, findTierIndexByValue } = useOperateEditingTierList();

  // state
  const { selectKeys, resetSelectKeys } = useCharBoxSelectKeys();

  // dnd
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.OPERATOR,
      drop: onDropCharacter,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [onDropCharacter],
  );

  const handleCharacterDelete = useCallback(
    (value: number, key: string) => {
      delTierOneChar(findTierIndexByValue(value) ?? 0, key);
    },
    [delTierOneChar, findTierIndexByValue],
  );

  const characterImgList = useMemo(() => {
    const characterList = mapToArray(charMap).filter(
      (character) => tier.characterKeys.indexOf(character?.key ?? '') > -1,
    );
    return characterList.map((value) => (
      <CharListItem
        key={value.key}
        character={value}
        onDelete={() => handleCharacterDelete(tier.value ?? 0, value.key)}
        onSelect={() => {}}
        fromTierValue={tier.value}
        type="tier-list"
      />
    ));
  }, [charMap, handleCharacterDelete, tier.characterKeys, tier.value]);

  // add new char into tier box
  const addCharacterButton = useMemo(
    () => (
      <DraggableCharContainer mini={setting.mini}>
        <Center
          sx={{ height: '100%', cursor: 'pointer' }}
          onClick={() => {
            addTierChars(findTierIndexByValue(tier.value ?? 0) ?? 0, selectKeys);
            resetSelectKeys();
          }}
        >
          <IconPlus color="grey" />
        </Center>
      </DraggableCharContainer>
    ),
    [setting.mini, addTierChars, findTierIndexByValue, tier.value, selectKeys, resetSelectKeys],
  );

  return (
    <Group
      p="md"
      spacing="md"
      ref={drop}
      sx={{
        border: isOver ? '1px #aaa solid' : '1px #ccc dashed',
        borderRadius: '20px',
        minHeight: setting.mini ? '76px' : '115px',
        position: 'relative',
        padding: '5px',
      }}
    >
      {characterImgList}
      {selectKeys.length > 0 && addCharacterButton}
      <Title
        px="xs"
        sx={{
          position: 'absolute',
          background: '#fff',
          top: '-14px',
          left: '20px',
        }}
        order={5}
      >
        {(tier?.name?.length ?? 0) > 0 ? tier.name : 'T ' + tier.value}
      </Title>
      {operationDisplay && (
        <>
          <Group
            sx={{
              position: 'absolute',
              top: '-10px',
              right: '20px',
              display: 'flex',
              zIndex: 1,
            }}
            spacing="xs"
          >
            <EditTierPopover tier={tier} onSubmit={onTierUpdate} tierValueList={tierValueList} />
            <DeleteTier onSubmit={onDeleteChar} />
          </Group>
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
    </Group>
  );
}
