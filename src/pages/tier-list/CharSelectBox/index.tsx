import { Box, Button } from '@mantine/core';
import Header from 'src/components/Header';

import { changeFold, changeNameDisplay, changeMini } from 'src/store/slice/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { FoldDown, FoldUp } from 'tabler-icons-react';
import { useTranslation } from 'react-i18next';
import CharListBox from '../CharListBox';
// import FilterBox from '../../../components/CharFilterDawer/FilterBox';

export default function Index() {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleMiniStatusChange = () => {
    dispatch(changeMini(!filters.mini));
  };

  const handleNameStatusChange = () => {
    dispatch(changeNameDisplay(!filters.nameDisplay));
  };

  const handleFoldStatusChange = () => {
    dispatch(changeFold(!filters.fold));
  };

  return (
    <Box
      sx={{
        flex: '1',
        minWidth: '326px',
        maxWidth: '726px',
        boxShadow: '0 0 5px 5px #eee',
        borderRadius: '20px',
        userSelect: 'none',
        maxHeight: '890px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          '::-webkit-scrollbar': { width: '0 !important' },
        }}
      >
        <Header title={t('charTitle')}>
          <Button
            size="xs"
            variant={!filters.mini ? 'outline' : 'filled'}
            color={!filters.mini ? 'blue' : 'green'}
            radius="xl"
            onClick={handleMiniStatusChange}
          >
            {t('MINI')}
          </Button>
          <Box sx={{ width: '15px' }} />
          <Button
            size="xs"
            variant={!filters.nameDisplay ? 'outline' : 'filled'}
            color={!filters.nameDisplay ? 'blue' : 'green'}
            radius="xl"
            onClick={handleNameStatusChange}
          >
            {t('name')}
          </Button>
          <Box sx={{ width: '15px' }} />
          <Button size="xs" variant="outline" radius="xl" onClick={handleFoldStatusChange}>
            {filters.fold ? <FoldDown /> : <FoldUp />}
          </Button>
        </Header>
        {/* <FilterBox /> */}
        <CharListBox />
        <Box sx={{ width: '100%', height: '15px' }} />
      </Box>
    </Box>
  );
}
