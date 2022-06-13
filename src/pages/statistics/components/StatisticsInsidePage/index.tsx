import { Box, Text, Group, List, Popover, useMantineTheme, Container, Divider, Stack, Title } from '@mantine/core';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TierListStatistic, TierListStatisticsServer } from 'src/api/TierListStatisticServer';
import { RootState } from 'src/store';
import { mapToArray } from 'src/utils/ObjectUtils';
import { IconInfoCircle } from '@tabler/icons';
import { errorNotice, successNotice } from 'src/components/Notice';
import CharStatisticBox from '../CharStatisticBox';
import CardRoot from 'src/components/CardRoot';
import { format } from 'date-fns';

export default function Index() {
  const [statisticData, setStatisticData] = useState<TierListStatistic>();
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const { currentEditKey } = useSelector((state: RootState) => state.tierList);
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  const fetchStatisticData = useCallback(async () => {
    return await new TierListStatisticsServer().getLatest({ keys: [currentEditKey] });
  }, [currentEditKey]);

  const handleLoadData = useCallback(async () => {
    const { data } = await fetchStatisticData();
    if (data[currentEditKey]) {
      Object.keys(charMap).forEach((key) => {
        data[currentEditKey].charStatistics[key] = {
          char: charMap[key],
          statistic: {
            count: data[currentEditKey]?.charStatistics?.[key]?.count,
            avgValue: data[currentEditKey]?.charStatistics?.[key]?.avgValue,
          },
        };
      });
      setStatisticData(data[currentEditKey]);
      successNotice(t('statistics.updated-successfully'));
    } else {
      setStatisticData(data[currentEditKey]);
      errorNotice(t('statistics.key-not-found'));
    }
  }, [charMap, currentEditKey, fetchStatisticData, t]);

  useEffect(() => {
    const timeout = setTimeout(() => handleLoadData(), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditKey]);

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
      <CardRoot>
        <Group position="apart" sx={{ textAlign: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Title order={3}>{statisticData?.count ?? t('statistics.key-not-found')}</Title>
            <Text>{t('statistics.count')}</Text>
          </Box>
          <Divider sx={{ height: '55px' }} orientation="vertical" />
          <Box sx={{ flex: 1 }}>
            <Title order={3}>{statisticData?.validCount ?? t('statistics.key-not-found')}</Title>
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              target={
                <Text sx={{ userSelect: 'none', cursor: 'pointer' }} onClick={() => setOpened((o) => !o)}>
                  {t('statistics.validCount')}
                  <IconInfoCircle size={10} />
                </Text>
              }
              width={310}
              position="bottom"
              withArrow
            >
              <List sx={{ fontSize: '14px' }}>
                <List.Item>以下情况计入有效样本：等级数大于2，干员评价数大于7，且上次保存时间在14天以内</List.Item>
                <List.Item>分数计算规则：将有效样本的评价等比反向映射到[0,5]，求出平均值</List.Item>
                <List.Item>分层按算法自动划分，统计数据每十分钟更新一次</List.Item>
              </List>
            </Popover>
          </Box>
          <Divider sx={{ height: '55px' }} orientation="vertical" />
          <Box sx={{ flex: 1 }}>
            <Title order={6}>
              {format(new Date(parseInt(statisticData?.createdDate ?? '0', 10)), 'yyyy-MM-dd hh:mm:ss')}
            </Title>
            {/* <Text>更新时间</Text> */}
          </Box>
        </Group>
      </CardRoot>
      <Stack spacing={0} sx={{ width: '100%' }}>
        {statistic.map((item, index) => (
          <React.Fragment key={index}>
            <Divider variant="dashed" label={convert(index + 1)} />
            <Group px={20}>{item}</Group>
          </React.Fragment>
        ))}
      </Stack>
    </>
  );
}
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

SelectItem.displayName = 'SelectItem';

function convert(num: number) {
  let a = num;
  const lookup: { [key: string]: number } = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let romanStr = '';
  // eslint-disable-next-line guard-for-in
  for (let i in lookup) {
    while (a >= lookup[i]) {
      romanStr += i;
      a -= lookup[i];
    }
  }
  return romanStr;
}
