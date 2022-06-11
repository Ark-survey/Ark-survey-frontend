import { Text, Center, Group } from '@mantine/core';
import React, { useMemo } from 'react';
import { timeMarks } from 'src/contexts';
import CharListItem from './CharListItem';

import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { filterOpenState } from 'src/store/slice/filterSlice';
import { mapToArray } from 'src/utils/ObjectUtils';
import { CharacterType } from 'src/store/slice/userSlice';
import { useTranslation } from 'react-i18next';

export default function CharacterList() {
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const filters = useSelector((state: RootState) => state.filters);
  const filterOpen = useSelector(filterOpenState);
  const { t } = useTranslation();

  const orderlyList = useMemo(() => {
    return mapToArray<CharacterType>(charMap)
      .sort((a, b) => {
        const diff = (a?.ts ?? 0) - (b?.ts ?? 0);
        if (diff === 0) {
          if (a.accessChannel === '限定寻访') return -1;
          if (a.accessChannel === '普通寻访') return 0;
          if (a.accessChannel === '活动赠送') return 1;
        }
        return diff;
      })
      .filter((c: any) => {
        if (filterOpen) {
          const startTime = timeMarks[0].ts;
          const endTime = timeMarks[timeMarks.length - 1].ts;
          const tsRange = endTime - startTime;
          if (filters.dateRange[0] !== 0 || filters.dateRange[1] !== 100) {
            if (
              (filters.dateRange[0] * tsRange) / 100 + startTime > (c?.ts ?? 0) ||
              (filters.dateRange[1] * tsRange) / 100 + startTime < (c?.ts ?? 0)
            ) {
              return false;
            }
          } else {
            for (let key in filters.chipGroup) {
              if (filters.chipGroup[key].length > 0 && filters.chipGroup[key].indexOf(c[key]) < 0) {
                return false;
              }
            }
          }
        }
        return true;
      });
  }, [charMap, filterOpen, filters.dateRange, filters.chipGroup]);

  const list = useMemo(() => {
    return orderlyList.map((character, index) => (
      <React.Fragment key={character?.key ?? ''}>
        <CharListItem character={character} type="default" />
      </React.Fragment>
    ));
  }, [orderlyList]);

  return (
    <Group spacing={10} position="center">
      {orderlyList.length > 0 ? (
        list
      ) : (
        <Center key="none">
          <Text color="#ccc">{t('no-qualified')}</Text>
        </Center>
      )}
    </Group>
  );
}
