import { Box, Group, Space, Sx, Tooltip, useMantineTheme } from '@mantine/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TierListStatistic, TierListStatisticsServer } from 'src/api/TierListStatisticServer';
import { RootState } from 'src/store';
import { CharacterType } from 'src/store/slice/characterSlice';
import { mapToArray } from 'src/utils/ObjectUtils';
import CharListItem from '../CharListBox/components/CharListItem';
import { errorNotice, successNotice } from '../components/Notice';

function CharStatisticBox({
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
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        borderRadius: '10px',
        margin: '3px',
        padding: '5px 0',
        boxShadow: '0 1px 1px 1px #ccc',
        textAlign: 'center',
        minHeight: '70px',
        display: 'flex',
        flexFlow: 'row wrap',
        flex: '0 1 45px',
        position: 'relative',
        boxSizing: 'border-box',
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          fontSize: '16px',
          transform: 'scale(0.5)',
          top: '0',
          left: '0',
          zIndex: 1,
        }}
      >
        {'#' + (index + 1)}
      </Box>
      <Box sx={{ margin: '0 auto', marginTop: '10px' }}>
        <CharListItem character={char} />
      </Box>
      <Box sx={{ fontSize: '14px', width: '100%', lineHeight: '16px' }}>
        <Tooltip position="bottom" label={statistic?.count + ' 评价'} sx={{ cursor: 'pointer' }}>
          {statistic?.count ? statistic?.avgValue?.toFixed(2) : t('no-ratings-yet')}
        </Tooltip>
      </Box>
    </Box>
  );
}

export default function Index() {
  const [statisticData, setStatisticData] = useState<TierListStatistic>();
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const currentKey = useSelector((state: RootState) => state.tierListStatistics.currentKey);
  const { t } = useTranslation();
  const theme = useMantineTheme();

  const fetchStatisticData = useCallback(async () => {
    return await new TierListStatisticsServer().getLatest({ keys: [currentKey] });
  }, [currentKey]);

  const handleLoadData = useCallback(async () => {
    const { data } = await fetchStatisticData();
    if (data[currentKey]) {
      Object.keys(charMap).forEach((key) => {
        data[currentKey].charStatistics[key] = {
          char: charMap[key],
          statistic: {
            count: data[currentKey].charStatistics[key].count,
            avgValue: data[currentKey].charStatistics[key].avgValue,
          },
        };
      });
      setStatisticData(data[currentKey]);
      successNotice(t('statistics.updated-successfully'));
    } else {
      errorNotice(t('statistics.key-not-found'));
    }
  }, [charMap, currentKey, fetchStatisticData, t]);

  useEffect(() => {
    const timeout = setTimeout(() => handleLoadData(), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statistic = useMemo(() => {
    const sortableCharList = mapToArray(statisticData?.charStatistics ?? {})
      .filter((item) => (item.char?.rarity ?? 0) > 4)
      .sort((a, b) => {
        return (b.statistic?.avgValue ?? 0) - (a.statistic?.avgValue ?? 0);
      });
    const tierColor = [
      theme.colors.grape[3],
      theme.colors.grape[2],
      theme.colors.grape[1],
      theme.colors.pink[3],
      theme.colors.pink[2],
      theme.colors.pink[1],
      theme.colors.red[3],
      theme.colors.red[2],
      theme.colors.red[1],
      theme.colors.orange[3],
      theme.colors.orange[2],
      theme.colors.orange[1],
      theme.colors.yellow[3],
      theme.colors.yellow[2],
      theme.colors.yellow[1],
      theme.colors.lime[3],
      theme.colors.lime[2],
      theme.colors.lime[1],
      theme.colors.green[3],
      theme.colors.green[2],
      theme.colors.green[1],
      theme.colors.teal[3],
      theme.colors.teal[2],
      theme.colors.teal[1],
      theme.colors.cyan[3],
      theme.colors.cyan[2],
      theme.colors.cyan[1],
      theme.colors.blue[3],
      theme.colors.blue[2],
      theme.colors.blue[1],
      theme.colors.violet[3],
      theme.colors.violet[2],
      theme.colors.violet[1],
      theme.colors.gray[3],
      theme.colors.gray[2],
      theme.colors.gray[1],
    ];
    const charSortList: Array<any[]> = [[]];
    console.log(charSortList);

    let flag = 0;
    sortableCharList.forEach((item, index) => {
      if (
        sortableCharList[index - 1] &&
        sortableCharList[index - 2] &&
        ((sortableCharList[index - 1].statistic?.avgValue ?? 0) +
          (sortableCharList[index - 2].statistic?.avgValue ?? 0)) /
          2 -
          (sortableCharList[index].statistic?.avgValue ?? 0) >
          0.08 &&
        (sortableCharList[index - 1].statistic?.avgValue ?? 0) - (sortableCharList[index].statistic?.avgValue ?? 0) >
          0.05
      ) {
        ++flag;
        if (flag % 3 === 0) charSortList.push([]);
        if (
          (flag + 1) % 3 === 0 &&
          (sortableCharList[index - 1].statistic?.avgValue ?? 0) - (sortableCharList[index].statistic?.avgValue ?? 0) >
            0.2
        ) {
          charSortList.push([]);
          ++flag;
        }
        if (
          (flag + 2) % 3 === 0 &&
          (sortableCharList[index - 1].statistic?.avgValue ?? 0) - (sortableCharList[index].statistic?.avgValue ?? 0) >
            0.2
        ) {
          charSortList.push([]);
          flag += 2;
        }
      }
      charSortList[Math.floor(flag / 3)].push(
        <CharStatisticBox
          key={index}
          char={item.char}
          index={index}
          all={Math.floor(statisticData?.validCount ?? 0)}
          sx={{ background: tierColor[flag] }}
          statistic={item.statistic}
        />,
      );
    });
    return charSortList;
  }, [statisticData, theme.colors]);

  return (
    <>
      <Group spacing="xs" position="center" sx={{ width: '100%', marginBottom: '20px' }}>
        <Box
          sx={{
            boxShadow: '0 0 5px 2px #ccc',
            padding: '10px',
            borderRadius: '10px',
            width: '140px',
            textAlign: 'center',
          }}
        >
          <Box sx={{ fontSize: '20px', fontWeight: 600 }}>{statisticData?.count}</Box>
          <Box sx={{ fontSize: '14px' }}>{t('statistics.count')}</Box>
        </Box>

        <Box
          sx={{
            boxShadow: '0 0 5px 2px #ccc',
            padding: '10px',
            borderRadius: '10px',
            width: '140px',
            textAlign: 'center',
          }}
        >
          <Box sx={{ fontSize: '20px', fontWeight: 600 }}>{statisticData?.validCount}</Box>
          <Box sx={{ fontSize: '14px' }}>{t('statistics.validCount')}</Box>
        </Box>
      </Group>
      {statistic.map((item, index) => (
        <React.Fragment key={index}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap' }}>{item}</Box>
          <Space h={5} />
        </React.Fragment>
      ))}
    </>
  );
}
