import { ActionIcon, createStyles, Divider, Group, Paper, Stack } from '@mantine/core';
import Header from 'src/components/Header';

import { changeFold } from 'src/store/slice/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { Filter } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';
import CharListBox from '../CharListBox';
import { changeMini, changeNameDisplay } from 'src/store/slice/settingSlice';
import useCharFilterDrawer from 'src/components/CharFilterDrawer/useCharFilterDrawer';
// import FilterBox from '../../../components/CharFilterDrawer/FilterBox';

const useStyles = createStyles((theme) => ({
  root: {
    maxWidth: 686,
    width: '100%',
  },
}));

export default function Index() {
  const { setOpened, drawerContext } = useCharFilterDrawer();
  const filters = useSelector((state: RootState) => state.filters);
  const setting = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const { t } = useTranslation();

  const handleMiniStatusChange = () => {
    dispatch(changeMini(!setting.mini));
  };

  const handleNameStatusChange = () => {
    dispatch(changeNameDisplay(!setting.nameDisplay));
  };

  const handleFoldStatusChange = () => {
    dispatch(changeFold(!filters.fold));
  };

  return (
    <Paper shadow="md" radius="lg" p="lg" withBorder className={classes.root}>
      <Stack>
        <Header title={t('charTitle')}>
          <Group position="right" spacing={10}>
            <ActionIcon size="lg" radius="md" onClick={() => setOpened(true)}>
              <Filter />
            </ActionIcon>
          </Group>
        </Header>
        <Divider />
        <CharListBox />
      </Stack>
      {drawerContext}
    </Paper>
  );
}
