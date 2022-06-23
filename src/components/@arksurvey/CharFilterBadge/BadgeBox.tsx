import { Box, Badge, createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
  badge: {
    marginRight: '15px',
    width: '100%',
  },
}));

export default function Index({ title, chips, list }: { title: string; chips: any; list: any[] }) {
  const { classes } = useStyles();

  return chips?.length > 0 ? (
    <Box className={classes.badge}>
      <Badge>
        {title + ' ' + chips.map((item: any) => list[list.findIndex((i) => i.value === item)]?.name).join(',')}
      </Badge>
    </Box>
  ) : null;
}
