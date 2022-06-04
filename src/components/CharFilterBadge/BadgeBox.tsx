import { Box, Badge, createStyles } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

const useStyles = createStyles((theme, _params, getRef) => ({
  badge: {
    marginRight: '15px',
    width: '100%',
  },
}));

export default function Index({ title, badgeKey, list }: { title: string; badgeKey: string; list: any[] }) {
  const filters = useSelector((state: RootState) => state.filters);
  const { classes } = useStyles();

  return filters.chipGroup[badgeKey]?.length > 0 ? (
    <Box className={classes.badge}>
      <Badge>
        {title +
          ' ' +
          filters.chipGroup[badgeKey].map((item) => list[list.findIndex((i) => i.value === item)]?.name).join(',')}
      </Badge>
    </Box>
  ) : null;
}
