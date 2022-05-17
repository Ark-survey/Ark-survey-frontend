import { Box, Group, Image } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TierListServer } from 'src/api';
import { CharStatistic, TierListStatisticType } from 'src/api/TierListServer';
import { RootState } from 'src/store';
import { CharacterType } from 'src/store/slice/characterSlice';
import { mapToArray } from 'src/utils/ObjectUtils';
import CharListItem from '../CharListBox/components/CharListItem';
import { successNotice, errorNotice } from '../components/Notice';

function CharStatisticBox({ char, statistic }: { char: CharacterType; statistic: CharStatistic }) {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        margin: '8px',
        padding: '10px',
        boxShadow: '0 0 5px 2px #ccc',
        textAlign: 'center',
        minHeight: '90px',
      }}
    >
      <CharListItem character={char} />
      {statistic?.count ? (
        <>
          <Box sx={{ fontSize: '20px' }}>{statistic?.avgValue?.toFixed(2)}</Box>
          <Box sx={{ fontSize: '12px' }}>{statistic?.count}</Box>
        </>
      ) : (
        <Box sx={{ fontSize: '12px', lineHeight: '40px' }}>暂无评分</Box>
      )}
    </Box>
  );
}

export default function Index() {
  const [statisticData, setStatisticData] = useState<TierListStatisticType>();
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const dispatch = useDispatch();

  const fetchStatisticData = useCallback(async () => {
    return await new TierListServer().averageAll();
  }, []);

  const handleLoadData = useCallback(async () => {
    const { data } = await fetchStatisticData();

    Object.keys(charMap).forEach((key) => {
      data.charStatistics[key] = {
        char: charMap[key],
        statistic: data.charStatistics[key],
      };
    });
    setStatisticData(data);
    successNotice('统计数据更新成功');
  }, [charMap, fetchStatisticData]);

  useEffect(() => {
    const timeout = setTimeout(() => handleLoadData(), 100);
    return () => clearTimeout(timeout);
  }, [handleLoadData]);

  const statistic = useMemo(() => {
    const sortableCharList = mapToArray(statisticData?.charStatistics ?? {})
      .filter((item) => (item.char?.rarity ?? 0) > 4)
      .sort((a, b) => {
        return (b.statistic?.avgValue ?? 0) - (a.statistic?.avgValue ?? 0);
      });
    return sortableCharList.map((item, index) => {
      return <CharStatisticBox key={index} char={item.char} statistic={item.statistic} />;
    });
  }, [statisticData?.charStatistics]);

  return (
    <>
      <Box sx={{ width: '100%', margin: '8px', marginBottom: '10px' }}>
        <Group spacing="xs">
          <Box
            sx={{
              boxShadow: '0 0 5px 2px #ccc',
              height: '100px',
              borderRadius: '10px',
              width: '155px',
              textAlign: 'center',
            }}
          >
            <Box sx={{ fontSize: '20px', fontWeight: 600, padding: '15px', paddingBottom: '10px' }}>总样本数量</Box>
            <Box sx={{ fontSize: '25px' }}>{statisticData?.count}</Box>
          </Box>

          <Box
            sx={{
              boxShadow: '0 0 5px 2px #ccc',
              height: '100px',
              margin: '8px',
              borderRadius: '10px',
              width: '155px',
              textAlign: 'center',
            }}
          >
            <Box sx={{ fontSize: '20px', fontWeight: 600, padding: '15px', paddingBottom: '10px' }}>有效样本数量</Box>
            <Box sx={{ fontSize: '25px' }}>{statisticData?.validCount}</Box>
          </Box>
        </Group>
      </Box>
      <Box sx={{ display: 'flex', flexFlow: 'row wrap' }}>{statistic}</Box>
    </>
  );
}
