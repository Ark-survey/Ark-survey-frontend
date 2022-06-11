import { Button, Box, Stack, ScrollArea, Group, Paper } from '@mantine/core';
import { useCallback, useEffect, useMemo } from 'react';
import { rarity, profession, accessChannel, sex, position } from 'src/contexts';
import { filterHeightState, changeChipGroup, changeDateRange, reset } from 'src/store/slice/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { ChipGroups } from './ChipGroups';
import { DateSelect } from './DateSelect';
import { useTranslation } from 'react-i18next';

export default function CharFilterBox() {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDateSelectChange = useCallback(
    (values: [number, number]) => {
      dispatch(changeDateRange(values));
    },
    [dispatch],
  );

  const handleChipsChange = useCallback(
    (values: string[], groupName: string) => {
      dispatch(
        changeChipGroup({
          ...filters.chipGroup,
          [groupName]: values,
        }),
      );
    },
    [dispatch, filters],
  );

  const handleResetFilter = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  const chipGroupList = useMemo(() => {
    return (
      <>
        <ChipGroups
          label={t('rarity')}
          tags={rarity}
          values={filters.chipGroup['rarity']}
          onChange={(values) => handleChipsChange(values, 'rarity')}
        />
        <ChipGroups
          label={t('profession')}
          tags={profession}
          values={filters.chipGroup['profession']}
          onChange={(values) => handleChipsChange(values, 'profession')}
        />
        {/* <ChipGroups
          disabled
          label={t('accessChannel')}
          tags={accessChannel}
          values={filters.chipGroup['accessChannel']}
          onChange={(values) => handleChipsChange(values, 'accessChannel')}
        /> */}
        {/* <ChipGroups
          disabled
          label={t('gender')}
          tags={sex}
          values={filters.chipGroup['sex']}
          onChange={(values) => handleChipsChange(values, 'sex')}
        /> */}
        <ChipGroups
          label={t('position')}
          tags={position}
          values={filters.chipGroup['position']}
          onChange={(values) => handleChipsChange(values, 'position')}
        />
      </>
    );
  }, [filters.chipGroup, handleChipsChange, t]);

  const filterBlock = useMemo(() => {
    if (
      filters.chipGroup['rarity']?.length === 0 &&
      filters.chipGroup['profession']?.length === 0 &&
      // filters.chipGroup['accessChannel']?.length === 0 &&
      // filters.chipGroup['sex']?.length === 0 &&
      filters.chipGroup['position']?.length === 0 &&
      filters.dateRange[0] === 0 &&
      filters.dateRange[1] === 100
    ) {
      return true;
    }
    return false;
  }, [filters.chipGroup, filters.dateRange]);

  return (
    <Stack sx={{ maxHeight: 'calc(100vh - 70px)' }} spacing="xl">
      <Stack sx={{ maxHeight: 'calc(100vh - 135px)', overflow: 'auto', boxSizing: 'border-box' }}>
        <DateSelect
          value={filters['dateRange']}
          label={t('Operator-installation-time')}
          onChange={handleDateSelectChange}
        />
        {chipGroupList}
      </Stack>
      <Button variant="outline" onClick={handleResetFilter}>
        重置
      </Button>
    </Stack>
  );
}
