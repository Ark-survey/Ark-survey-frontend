import { Box, Button, Container, Stack } from '@mantine/core';
import Header from 'src/components/Header';
import DraggableTierList from './DraggableTierList';
import FilterBox from './FilterBox';
import CharListBox from './CharListBox';

import { changeFold, changeNameDisplay, changeMini } from 'src/store/slice/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { FoldDown, FoldUp } from 'tabler-icons-react';
import LoadDataPaper from './LoadDataPaper';
import { useCallback, useEffect } from 'react';
import { TierListServer } from 'src/api';
import { updateAllCharacterPicked, updateCharacterPicked, updateCharacterUrl } from 'src/store/slice/characterSlice';
import { resetUserTierList, loadUserTierList } from 'src/store/slice/tierSlice';
import { updateNewTierListStatus, updateVersion } from 'src/store/slice/userSlice';
import { errorNotice, successNotice } from './components/Notice';
import TierListStatistics from './TierListStatistics';
import { MetaDataServer } from 'src/api/MetaDataServer.';

export default function Index() {
  const filters = useSelector((state: RootState) => state.filters);
  const userTierList = useSelector((state: RootState) => state.userTierList);
  const user = useSelector((state: RootState) => state.user);
  const newTierList = useSelector((state: RootState) => state.user.newTierList);
  const dispatch = useDispatch();

  const handleMiniStatusChange = () => {
    dispatch(changeMini(!filters.mini));
  };

  const handleNameStatusChange = () => {
    dispatch(changeNameDisplay(!filters.nameDisplay));
  };

  const handleFoldStatusChange = () => {
    dispatch(changeFold(!filters.fold));
  };

  const fetchFindTierList = useCallback(async ({ id }: { id: string }) => {
    return await new TierListServer().findById({ id });
  }, []);

  const fetchLatestMetaData = useCallback(async () => {
    return await new MetaDataServer().latest();
  }, []);

  const handleLoadData = async () => {
    const { data } = await fetchLatestMetaData();
    dispatch(updateVersion(data.version ?? ''));
    dispatch(updateCharacterUrl(data.imgUrlOrigin ?? ''));
    successNotice('基础数据更新成功');
    if (!newTierList && userTierList?.id) {
      const res = await fetchFindTierList({ id: userTierList.id });
      if (!res?.data?.id) {
        errorNotice('该 ID 无对应数据');
        dispatch(resetUserTierList());
        dispatch(updateAllCharacterPicked(false));
      } else {
        res.data.tierList.forEach((item) => {
          item.characterKeys.forEach((key) => {
            dispatch(updateCharacterPicked({ key, picked: true }));
          });
        });
        dispatch(loadUserTierList(res.data));
        dispatch(updateNewTierListStatus(false));
        successNotice('等级表数据加载成功');
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => handleLoadData(), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return newTierList || (!newTierList && userTierList?.id) ? (
    <Container size={1500} sx={{ paddingBottom: '50px' }}>
      {user.viewPageId === 'tier-list-real-time' ? (
        <TierListStatistics />
      ) : (
        <Stack
          spacing={20}
          sx={{
            flexFlow: 'row wrap',
            alignItems: 'stretch',
          }}
        >
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
              <Header title="干员盒">
                <Button
                  size="xs"
                  variant={!filters.mini ? 'outline' : 'filled'}
                  color={!filters.mini ? 'blue' : 'green'}
                  radius="xl"
                  onClick={handleMiniStatusChange}
                >
                  MINI
                </Button>
                <Box sx={{ width: '15px' }} />
                <Button
                  size="xs"
                  variant={!filters.nameDisplay ? 'outline' : 'filled'}
                  color={!filters.nameDisplay ? 'blue' : 'green'}
                  radius="xl"
                  onClick={handleNameStatusChange}
                >
                  名称
                </Button>
                <Box sx={{ width: '15px' }} />
                <Button size="xs" variant="outline" radius="xl" onClick={handleFoldStatusChange}>
                  {filters.fold ? <FoldDown /> : <FoldUp />}
                </Button>
              </Header>
              <FilterBox />
              <CharListBox />
              <Box sx={{ width: '100%', height: '15px' }} />
            </Box>
          </Box>
          <DraggableTierList />
        </Stack>
      )}
    </Container>
  ) : (
    <LoadDataPaper />
  );
}
