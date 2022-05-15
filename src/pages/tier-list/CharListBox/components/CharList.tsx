import { Box } from '@mantine/core';
import React, { useMemo } from 'react';
import { timeMarks } from 'src/contexts';
import CharListItem, { CharListItemType } from './CharListItem';

import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { filterOpenState } from 'src/store/slice/filterSlice';
import { mapToArray } from 'src/utils/ObjectUtils';
import { CharacterType } from 'src/store/slice/characterSlice';

export default function CharacterList() {
  const charMap = useSelector((state: RootState) => state.characters.charMap);
  const filters = useSelector((state: RootState) => state.filters);
  const filterOpen = useSelector(filterOpenState);

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
        <CharListItem character={character} type={CharListItemType.NORMAL} />
        {index === orderlyList.length - 1 &&
          new Array(15)
            .fill(0)
            .map((i, index) => <CharListItem key={'e-' + index} empty type={CharListItemType.NORMAL} />)}
      </React.Fragment>
    ));
  }, [orderlyList]);

  return (
    <Box
      sx={{
        paddingTop: '5px',
        display: 'flex',
        flexFlow: 'row wrap',
      }}
    >
      {orderlyList.length > 0 ? (
        list
      ) : (
        <Box
          key="none"
          sx={{
            width: '100%',
            textAlign: 'center',
            marginTop: '10px',
            color: '#ccc',
          }}
        >
          没有符合条件的干员
        </Box>
      )}
    </Box>
  );
}
