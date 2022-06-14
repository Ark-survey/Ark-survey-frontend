import { Button, Box } from '@mantine/core';
import { useCallback, useEffect, useMemo } from 'react';
import { rarity, profession, accessChannel, sex, position } from 'src/contexts';
import { changeChipGroup, changeDateRange, reset } from 'src/store/slice/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import TimeBadgeBox from './TimeBadgeBox';
import BadgeBox from './BadgeBox';
import { useTranslation } from 'react-i18next';

export default function Index() {
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

  useEffect(() => {
    handleResetFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterBlock = useMemo(() => {
    if (
      filters.chipGroup['rarity']?.length === 0 &&
      filters.chipGroup['profession']?.length === 0 &&
      filters.chipGroup['accessChannel']?.length === 0 &&
      filters.chipGroup['sex']?.length === 0 &&
      filters.chipGroup['deployment']?.length === 0 &&
      filters.dateRange[0] === 0 &&
      filters.dateRange[1] === 100
    ) {
      return true;
    }
    return false;
  }, [filters.chipGroup, filters.dateRange]);

  const badges = useMemo(() => {
    return filterBlock ? (
      <Box sx={{ color: '#aaa', fontWeight: 900, lineHeight: '30px' }}>{t('Not-filtered')}</Box>
    ) : (
      <>
        {(filters.dateRange[0] !== 0 || filters.dateRange[1] !== 100) && <TimeBadgeBox />}
        <BadgeBox title={t('rarity')} badgeKey="rarity" list={rarity} />
        <BadgeBox title={t('profession')} badgeKey="profession" list={profession} />
        <BadgeBox title={t('accessChannel')} badgeKey="accessChannel" list={accessChannel} />
        <BadgeBox title={t('gender')} badgeKey="sex" list={sex} />
        <BadgeBox title={t('position')} badgeKey="position" list={position} />
      </>
    );
  }, [filterBlock, filters.dateRange, t]);

  return (
    <Box
      sx={{
        transition: 'all 1s',
        boxShadow: '0 1px 2px 2px #eee',
        borderRadius: '0 0 20px 20px',
        padding: '0 10px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: 'calc(114px + 100%)',
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          transition: 'all 1s',
          height: '40px',
          marginRight: filters.fold ? '0' : '-100%',
          right: filters.fold ? '0' : '12px',
        }}
      >
        <Button variant="outline" color="dark" radius="xl" size="xs" onClick={handleResetFilter}>
          {t('reset-condition')}
        </Button>
        <Box
          sx={{
            width: 'calc(100% - 114px)',
            display: 'flex',
            justifyContent: filterBlock ? 'center' : 'flex-start',
            flexFlow: 'row wrap',
            boxSizing: 'border-box',
            padding: '0 18px',
            position: 'relative',
          }}
        >
          {badges}
          {!filterBlock && (
            <Box
              sx={{
                fontSize: '18px',
                position: 'absolute',
                fontWeight: 900,
                color: '#ccc',
                zIndex: -1,
                right: 10,
              }}
            >
              {t('condition')}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
