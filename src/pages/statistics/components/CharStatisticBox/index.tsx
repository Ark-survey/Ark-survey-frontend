import { Sx, Box, Group, Paper, Stack } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CharContainer from 'src/components/char-container';
import { RootState } from 'src/store';
import { CharacterType } from 'src/store/slice/userSlice';

export default function CharStatisticBox({
  char,
  statistic,
  sx,
  index,
  all,
}: {
  char: CharacterType;
  statistic: {
    avgValue?: number; // 均分
    count?: number; // 被评价的次数
  };
  sx?: Sx;
  index: number;
  all: number;
}) {
  const setting = useSelector((state: RootState) => state.setting);
  const [opened, setOpened] = useState(false);
  const parent = useClickOutside(() => setOpened(false), ['mouseup', 'touchend']);
  const { t } = useTranslation();

  return (
    <Paper
      ref={parent}
      shadow="sm"
      radius="xl"
      sx={{
        ...sx,
        transition: 'all 0.3s',
        backgroundColor: statistic?.count ? undefined : '#fff',
        width: opened ? '120px' : '40px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={() => setOpened((opened) => !opened)}
    >
      <Group noWrap spacing={4} position="apart">
        <CharContainer mini readonly charKey={char.key} charName={char.name} nameDisplay={setting.nameDisplay} />
        <Box>{statistic?.count ? '#' + (index + 1) : ''}</Box>
        <Stack spacing={0} sx={{ fontSize: '12px', marginRight: '10px', transform: 'scale(0.8)' }}>
          <Box
            sx={{
              width: '100%',
              whiteSpace: 'nowrap',
            }}
          >
            {statistic?.count ? statistic?.avgValue?.toFixed(2) : t('no-ratings-yet')}
          </Box>
          <Box>{statistic?.count ?? 0}</Box>
        </Stack>
      </Group>
    </Paper>
  );
}
