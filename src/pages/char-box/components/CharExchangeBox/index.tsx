import { Button, Stack, ScrollArea, Group, Divider, Paper, createStyles } from '@mantine/core';
import Header from 'src/components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { ChevronsDown, ChevronsUp, Exchange } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';
import CharList from './CharList';
import { updateCharBoxEditing } from 'src/store/slice/settingSlice';

const useStyles = createStyles((theme) => ({
  root: {
    maxWidth: 686,
  },
}));

export default function Index({ onClickFilter }: { onClickFilter: () => void }) {
  const filters = useSelector((state: RootState) => state.filters);
  const { charBoxEditing } = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { classes } = useStyles();

  return (
    <Paper shadow="md" radius="lg" p="lg" withBorder className={classes.root}>
      <Stack>
        <Header title={charBoxEditing ? '干员盒' : '持有编辑'}>
          <Group position="right" spacing={10}>
            {!charBoxEditing && (
              <Button
                size="xs"
                variant={!filters.mini ? 'outline' : 'filled'}
                color="green"
                radius="xl"
                // onClick={handleMiniStatusChange}
              >
                未持有全选
              </Button>
            )}
            <Button size="xs" variant="outline" radius="xl" onClick={onClickFilter}>
              筛选器
            </Button>
          </Group>
        </Header>
        <Divider />
        {!charBoxEditing && (
          <>
            <ScrollArea sx={{ height: '370px' }}>
              <CharList />
            </ScrollArea>
            <Divider />
            <Group position="center">
              <Button leftIcon={<ChevronsUp />} size="xs" color="red" variant="outline">
                移至未持有
              </Button>
              <Button leftIcon={<ChevronsDown />} size="xs" variant="outline">
                移至已持有
              </Button>
            </Group>
            <Divider />
          </>
        )}
        <ScrollArea sx={{ height: !charBoxEditing ? '370px' : '' }}>
          <CharList />
        </ScrollArea>
        <Divider />
        <Group position="center">
          <Button
            variant={charBoxEditing ? 'outline' : 'filled'}
            color="indigo"
            leftIcon={<Exchange />}
            onClick={() => dispatch(updateCharBoxEditing(!charBoxEditing))}
          >
            {charBoxEditing ? '练度编辑模式' : '持有编辑模式'}
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
