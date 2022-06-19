import { Button, Stack } from '@mantine/core';
import { useCallback, useMemo } from 'react';
import { rarity, profession, position } from 'src/contexts';
import { ChipGroups } from './ChipGroups';
import { DateSelect } from './DateSelect';
import { useTranslation } from 'react-i18next';

export const initialState: FilterType = {
  fold: true,
  chipGroup: {
    opRate: [],
    profession: [],
    // sex: [],
    rarity: [5],
    position: [],
    // accessChannel: [],
  },
  dateRange: [0, 100],
};

export interface FilterType {
  chipGroup: { [x: string]: any[] };
  dateRange: [number, number];
  fold: boolean;
}

interface CharFilterDrawerProps {
  filters: FilterType;
  onFilterChange?: (filters: FilterType) => void;
}

export default function CharFilterBox({ filters, onFilterChange }: CharFilterDrawerProps) {
  const { t } = useTranslation();

  const handleDateSelectChange = useCallback(
    (values: [number, number]) => {
      onFilterChange?.({
        ...filters,
        dateRange: values,
      });
    },
    [filters, onFilterChange],
  );

  const handleChipsChange = useCallback(
    (values: string[], groupName: string) => {
      onFilterChange?.({
        ...filters,
        chipGroup: {
          ...filters.chipGroup,
          [groupName]: values,
        },
      });
    },
    [filters, onFilterChange],
  );

  const handleResetFilter = () => {
    onFilterChange?.(initialState);
  };

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
          disabled
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
