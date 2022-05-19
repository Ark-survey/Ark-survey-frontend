import { useState } from 'react';
import { Popover, Button, Box, Text, ActionIcon } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import { updateCharacterPicked, updateCharacterSelecting } from 'src/store/slice/characterSlice';
import { addCharacterByTier } from 'src/store/slice/tierSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { successNotice } from '../../components/Notice';
import { useTranslation } from 'react-i18next';

export default function AddCharactersToTierPopover({ tierValue }: { tierValue: number }) {
  const [opened, setOpened] = useState(false);
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleConfirm = () => {
    Object.keys(charMap).forEach((key) => {
      if (charMap[key].selecting) {
        dispatch(updateCharacterPicked({ key, picked: true }));
        dispatch(updateCharacterSelecting({ key, selecting: false }));
        dispatch(addCharacterByTier({ tierValue, key }));
      }
    });
    successNotice(t('bulk-added-successfully'));
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon
          sx={{
            background: '#fff',
          }}
          size="xs"
          radius="xs"
          onClick={() => setOpened((o) => !o)}
        >
          <Plus />
        </ActionIcon>
      }
      width={210}
      position="right"
      placement="center"
      withArrow
    >
      <Text size="sm">{t('tier-add-confirm')}</Text>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Button sx={{ marginTop: '15px' }} radius="xl" color="blue" onClick={handleConfirm}>
          {t('confirm-add')}
        </Button>
      </Box>
    </Popover>
  );
}
