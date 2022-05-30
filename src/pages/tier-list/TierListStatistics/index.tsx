import {
  Box,
  Text,
  Center,
  Group,
  List,
  Popover,
  Select,
  Space,
  Sx,
  Tooltip,
  useMantineTheme,
  Container,
} from '@mantine/core';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TierListStatistic, TierListStatisticsServer } from 'src/api/TierListStatisticServer';
import CharContainer from 'src/components/char-container';
import { RootState } from 'src/store';
import { CharacterType } from 'src/store/slice/characterSlice';
import { updateKey1, updateKey2 } from 'src/store/slice/TierListStatisticsSlice';
import { mapToArray } from 'src/utils/ObjectUtils';
import { treeToArray } from 'src/utils/TreeUtils';
import { InfoCircle } from 'tabler-icons-react';
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
        userSelect: 'none',
        ...sx,
        backgroundColor: statistic?.count ? undefined : '#fff',
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
        {statistic?.count ? '#' + (index + 1) : '-'}
      </Box>
      <Box sx={{ margin: '0 auto', marginTop: '10px', padding: '5px' }}>
        <CharContainer mini readonly charKey={char.key} />
      </Box>
      <Box
        sx={{
          fontSize: statistic?.count ? '14px' : '12px',
          width: '100%',
          lineHeight: '16px',
          transform: statistic?.count ? '' : 'scale(0.8)',
        }}
      >
        <Tooltip position="bottom" label={(statistic?.count ?? 0) + ' 评价'} sx={{ cursor: 'pointer' }}>
          {statistic?.count ? statistic?.avgValue?.toFixed(2) : t('no-ratings-yet')}
        </Tooltip>
      </Box>
    </Box>
  );
}

export default function Index() {
  const listTypeCollection = useSelector((state: RootState) => state.tierListType.collection);
  const [statisticData, setStatisticData] = useState<TierListStatistic>();
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const { currentKey, key1Select, key2Select } = useSelector((state: RootState) => state.tierListStatistics);
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

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
            count: data[currentKey]?.charStatistics?.[key]?.count,
            avgValue: data[currentKey]?.charStatistics?.[key]?.avgValue,
          },
        };
      });
      setStatisticData(data[currentKey]);
      successNotice(t('statistics.updated-successfully'));
    } else {
      setStatisticData(data[currentKey]);
      errorNotice(t('statistics.key-not-found'));
    }
  }, [charMap, currentKey, fetchStatisticData, t]);

  const type1List = useMemo(() => {
    const list = listTypeCollection.map((it) => ({
      value: it.id,
      label: it.name,
    }));
    dispatch(updateKey1(list[0].value));
    return list;
  }, [dispatch, listTypeCollection]);

  const type2List = useMemo(() => {
    let list = [];
    if (key1Select === 'AE') {
      list = treeToArray(listTypeCollection[0].children).map((it) => ({
        value: it.id,
        label: it.name,
        road: it.roadId,
        description: it.description,
      }));
    } else {
      list = treeToArray(listTypeCollection[1].children, [1, 2], (node, road, level) => {
        if (level === 0) {
          return node.id;
        } else if (level === 1) {
          return road + '#' + node.id + ' ' + node.name;
        } else {
          return road + ' ' + node.name;
        }
      }).map((it) => ({
        value: it.id,
        label: it.road,
        road: it.roadId,
        description: it.description,
      }));
    }
    dispatch(updateKey2({ key: list[0].value, road: list[0].road ?? '' }));
    return list;
  }, [dispatch, key1Select, listTypeCollection]);

  const handleType1Change = (value: string) => {
    dispatch(updateKey1(value));
  };

  const handleType2Change = (value: string) => {
    const typeItem = type2List.find((it) => it.value === value);
    dispatch(updateKey2({ key: value, road: typeItem?.road ?? '' }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => handleLoadData(), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKey]);

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
    <Container size={1500} p="xl">
      <Center>
        <Box sx={{ margin: '20px', display: 'flex' }}>
          <Select sx={{ width: '75px' }} value={key1Select} onChange={handleType1Change} data={type1List} />
          <Select
            sx={{ width: '220px' }}
            value={key2Select}
            itemComponent={SelectItem}
            onChange={handleType2Change}
            searchable
            data={type2List}
          />
        </Box>
      </Center>
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
          <Box sx={{ fontSize: '20px', fontWeight: 600 }}>{statisticData?.count ?? t('statistics.key-not-found')}</Box>
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
          <Box sx={{ fontSize: '20px', fontWeight: 600 }}>
            {statisticData?.validCount ?? t('statistics.key-not-found')}
          </Box>
          <Popover
            opened={opened}
            onClose={() => setOpened(false)}
            target={
              <Box
                sx={{ fontSize: '14px', userSelect: 'none', cursor: 'pointer' }}
                onClick={() => setOpened((o) => !o)}
              >
                {t('statistics.validCount')}
                <InfoCircle size={10} />
              </Box>
            }
            width={310}
            position="bottom"
            withArrow
          >
            <List sx={{ fontSize: '14px' }}>
              <List.Item>以下情况计入有效样本：等级数大于2，干员评价数大于7</List.Item>
              <List.Item>分数计算规则：将有效样本的评价等比反向映射到[0,5]，求出平均值</List.Item>
              <List.Item>分层按算法自动划分</List.Item>
              <List.Item>统计数据三分钟更新一次</List.Item>
            </List>
          </Popover>
        </Box>
      </Group>
      {statistic.map((item, index) => (
        <React.Fragment key={index}>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap' }}>{item}</Box>
          <Space h={5} />
        </React.Fragment>
      ))}
    </Container>
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
