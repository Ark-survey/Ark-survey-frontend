import { Box, Group, Image, Space, Sx, useMantineTheme } from '@mantine/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TierListServer } from 'src/api';
import { CharStatistic, TierListStatisticType } from 'src/api/TierListServer';
import { RootState } from 'src/store';
import { CharacterType } from 'src/store/slice/characterSlice';
import { mapToArray } from 'src/utils/ObjectUtils';
import CharListItem from '../CharListBox/components/CharListItem';
import { successNotice, errorNotice } from '../components/Notice';

function CharStatisticBox({
  char,
  statistic,
  sx,
  index,
}: {
  char: CharacterType;
  statistic: CharStatistic;
  sx?: Sx;
  index: number;
}) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        borderRadius: '10px',
        margin: '5px',
        padding: '5px',
        boxShadow: '0 0 5px 2px #ccc',
        textAlign: 'center',
        minHeight: '90px',
        flex: '1',
        display: 'flex',
        flexFlow: 'row wrap',
        position: 'relative',
        ...sx,
      }}
    >
      <Box sx={{ position: 'absolute', fontSize: '18px', transform: 'scale(0.5)', top: '0', left: '0' }}>
        {'#' + (index + 1)}
      </Box>
      <Box sx={{ position: 'absolute', fontSize: '18px', transform: 'scale(0.5)', top: '0', right: '0' }}>
        {statistic?.count}
      </Box>
      <Box sx={{ margin: '0 auto', marginTop: '10px' }}>
        <CharListItem character={char} />
      </Box>
      {statistic?.count ? (
        <Box sx={{ fontSize: '18px', width: '100%', lineHeight: '20px' }}>{statistic?.avgValue?.toFixed(2)}</Box>
      ) : (
        <Box sx={{ fontSize: '12px', width: '100%', lineHeight: '20px' }}>{t('no-ratings-yet')}</Box>
      )}
    </Box>
  );
}

export default function Index() {
  const [statisticData, setStatisticData] = useState<TierListStatisticType>();
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useMantineTheme();

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
    successNotice(t('statistics-updated-successfully'));
  }, [charMap, fetchStatisticData, t]);

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
      theme.colors.red[3],
      theme.colors.red[2],
      theme.colors.red[1],
      theme.colors.pink[3],
      theme.colors.pink[2],
      theme.colors.pink[1],
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
    const charSortList: Array<any[]> = new Array(12).fill([]).map((item) => {
      return [];
    });
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
        if (
          (flag + 1) % 3 === 0 &&
          (sortableCharList[index - 1].statistic?.avgValue ?? 0) - (sortableCharList[index].statistic?.avgValue ?? 0) >
            0.2
        ) {
          ++flag;
        }
        if (
          (flag + 2) % 3 === 0 &&
          (sortableCharList[index - 1].statistic?.avgValue ?? 0) - (sortableCharList[index].statistic?.avgValue ?? 0) >
            0.2
        ) {
          flag += 2;
        }
      }
      console.log(Math.floor(flag / 3));

      charSortList[Math.floor(flag / 3)].push(
        <CharStatisticBox
          key={index}
          char={item.char}
          index={index}
          sx={{ background: tierColor[flag] }}
          statistic={item.statistic}
        />,
      );
    });
    return charSortList;
  }, [statisticData?.charStatistics, theme.colors]);

  return (
    <>
      <Box sx={{ width: '100%', margin: '8px', marginBottom: '20px' }}>
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
            <Box sx={{ fontSize: '20px', fontWeight: 600, padding: '15px', paddingBottom: '10px' }}>
              {t('statistics.count')}
            </Box>
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
            <Box sx={{ fontSize: '20px', fontWeight: 600, padding: '15px', paddingBottom: '10px' }}>
              {t('statistics.validCount')}
            </Box>
            <Box sx={{ fontSize: '25px' }}>{statisticData?.validCount}</Box>
          </Box>
        </Group>
      </Box>
      {statistic.map((item, index) => (
        <React.Fragment key={index}>
          <Box sx={{ display: 'flex', flexFlow: 'row wrap' }}>
            {item}
            {new Array(20).fill(0).map((item, key) => {
              return (
                <Box key={key} sx={{ flex: '1', minWidth: '50px', margin: '0 5px', padding: '0 5px', height: '1px' }} />
              );
            })}
          </Box>
          <Space h={10} />
        </React.Fragment>
      ))}
    </>
  );
}
