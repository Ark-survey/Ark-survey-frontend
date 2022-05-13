import { Box, Badge, createStyles } from "@mantine/core";
import { format } from "date-fns";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { timeMarks } from "src/contexts";
import { RootState } from "src/store";


const useStyles = createStyles((theme, _params, getRef) => ({
  badge: {
    marginRight: '15px',
    width: '100%'
  },
}));

export default function Index() {
  const filters = useSelector((state: RootState) => state.filters);
  const { classes } = useStyles();

  const startTime = useMemo(() => timeMarks[0].ts, [])
  const endTime = useMemo(() => timeMarks[timeMarks.length - 1].ts, [])
  const tsRange = useMemo(() => (endTime - startTime), [endTime, startTime])

  return (
    <Box className={classes.badge} >
      <Badge>
        {'干员实装时间：' + [format(new Date((filters.dateRange[0] * tsRange / 100 + startTime) * 1000), 'yyyy-MM-dd'),
        format(new Date((filters.dateRange[1] * tsRange / 100 + startTime) * 1000), 'yyyy-MM-dd')].join('至')
        }
      </Badge>
    </Box>
  )
}