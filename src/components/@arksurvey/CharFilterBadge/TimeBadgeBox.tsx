import { Box, Badge, createStyles } from '@mantine/core';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { timeMarks } from 'src/contexts';

const useStyles = createStyles((theme, _params, getRef) => ({
  badge: {
    marginRight: '15px',
    width: '100%',
  },
}));

export default function Index({ dateRange }: { dateRange: [number, number] }) {
  // const filters = useSelector((state: RootState) => state.filters);
  const { classes } = useStyles();
  const { t } = useTranslation();

  const startTime = useMemo(() => timeMarks[0].ts, []);
  const endTime = useMemo(() => timeMarks[timeMarks.length - 1].ts, []);
  const tsRange = useMemo(() => endTime - startTime, [endTime, startTime]);

  return (
    <Box className={classes.badge}>
      <Badge>
        {t('Operator-installation-time') +
          ' ' +
          [
            format(new Date(((dateRange[0] * tsRange) / 100 + startTime) * 1000), t('time-format')),
            format(new Date(((dateRange[1] * tsRange) / 100 + startTime) * 1000), t('time-format')),
          ].join(t('to'))}
      </Badge>
    </Box>
  );
}
