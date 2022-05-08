import { Button, Box, Badge, createStyles } from "@mantine/core";
import { format } from "date-fns";
import { useMemo } from "react";
import { rate, profession, accessChannel, sex, deployment, timeMarks } from "src/contexts";
import { ChipGroups } from "../components/ChipGroups";
import { DateSelect } from "../components/DateSelect";

export interface FilterType {
  chipGroup: { [x: string]: string[] };
  dateRange: [number, number];
  fold: boolean;
}

interface FilterBoxProps {
  filters: FilterType;
  height: number;
  onFoldStatusChange: () => void;
  onChipsChange: (values: string[], key: string) => void;
  onDateSelectChange: (value: [number, number]) => void;
  onResetFilter: () => void;
}

const useStyles = createStyles((theme, _params, getRef) => ({
  badge: {
    marginRight: '15px',
    width: '100%'
  },
}));

export default function Index({ filters, height, onChipsChange, onDateSelectChange, onResetFilter, onFoldStatusChange }: FilterBoxProps) {
  const { classes } = useStyles();
  const chipGroupList = useMemo(() => {
    return (
      <>
        <ChipGroups
          label={"星级"}
          tags={rate}
          values={filters.chipGroup["rate"]}
          onChange={(values) => onChipsChange(values, "rate")}
        />
        <ChipGroups
          label={"职业"}
          tags={profession}
          values={filters.chipGroup["profession"]}
          onChange={(values) => onChipsChange(values, "profession")}
        />
        <ChipGroups
          label={"获取渠道"}
          tags={accessChannel}
          values={filters.chipGroup["accessChannel"]}
          onChange={(values) => onChipsChange(values, "accessChannel")}
        />
        <ChipGroups
          label={"性别"}
          tags={sex}
          values={filters.chipGroup["sex"]}
          onChange={(values) => onChipsChange(values, "sex")}
        />
        <ChipGroups
          label={"部署位"}
          tags={deployment}
          values={filters.chipGroup["deployment"]}
          onChange={(values) => onChipsChange(values, "deployment")}
        />
      </>
    )
  }, [filters.chipGroup, onChipsChange])

  const filterBlock = useMemo(() => {
    if (filters.chipGroup["rate"].length === 0 &&
      filters.chipGroup["profession"].length === 0 &&
      filters.chipGroup["accessChannel"].length === 0 &&
      filters.chipGroup["sex"].length === 0 &&
      filters.chipGroup["deployment"].length === 0 &&
      filters.dateRange[0] === 0 &&
      filters.dateRange[1] === 100) {
      return true
    }
    return false
  }, [filters.chipGroup, filters.dateRange])

  const badges = useMemo(() => {
    const startTime = timeMarks[0].ts
    const endTime = timeMarks[timeMarks.length - 1].ts
    const tsRange = endTime - startTime
    return (
      filterBlock ?
        (<Box sx={{ color: '#aaa', fontWeight: 900 }}>{"未筛选"}</Box>) :
        (<>
          {(filters.dateRange[0] !== 0 ||
            filters.dateRange[1] !== 100) &&
            <Box className={classes.badge} >
              <Badge>
                {'干员实装时间：' + [format(new Date((filters.dateRange[0] * tsRange / 100 + startTime) * 1000), 'yyyy-MM-dd'),
                format(new Date((filters.dateRange[1] * tsRange / 100 + startTime) * 1000), 'yyyy-MM-dd')].join('至')
                }
              </Badge>
            </Box>
          }
          {filters.chipGroup["rate"].length > 0 &&
            <Box className={classes.badge} >
              <Badge> {'星级：' + filters.chipGroup["rate"].join(',')}</Badge>
            </Box>
          }
          {filters.chipGroup["profession"].length > 0 &&
            <Box className={classes.badge} >
              <Badge>{'职业：' + filters.chipGroup["profession"].join(',')}</Badge></Box>}
          {filters.chipGroup["accessChannel"].length > 0 &&
            <Box className={classes.badge} >
              <Badge>{'获取渠道：' + filters.chipGroup["accessChannel"].join(',')}</Badge></Box>}
          {filters.chipGroup["sex"].length > 0 &&
            <Box className={classes.badge} >
              <Badge>{'性别：' + filters.chipGroup["sex"].join(',')}</Badge></Box >
          }
          {filters.chipGroup["deployment"].length > 0 &&
            <Box className={classes.badge} >
              <Badge>{'部署位：' + filters.chipGroup["deployment"].join(',')}</Badge></Box>}
        </>)
    )
  }, [classes.badge, filterBlock, filters.chipGroup, filters.dateRange])

  return (
    <Box
      sx={{
        transition: 'all 1s',
        boxShadow: "0 1px 2px 2px #eee",
        borderRadius: "0 0 20px 20px",
        height,
        padding: "0 10px",
        overflow: "hidden"
      }}
    >
      <Box sx={{
        transition: 'all 1s',
        marginTop: filters.fold ? '-532px' : '0'
      }}>
        <DateSelect
          value={filters["dateRange"]} label={"干员实装时间"} onChange={onDateSelectChange} />
        {chipGroupList}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          transition: 'all 1s',
          height: "50px",
          marginLeft: filters.fold ? '-147px' : '0',
          marginRight: filters.fold ? '0' : '-478px'
        }}
      >
        <Button variant="outline" color="dark" radius="xl" onClick={onResetFilter}>
          重置为全部干员
        </Button>
        <Box sx={{
          width: 478,
          display: 'flex',
          justifyContent: filterBlock ? 'center' : 'start',
          flexFlow: 'row wrap',
          boxSizing: 'border-box',
          padding: '0 18px',
          position: 'relative'
        }}>
          {badges}
          {!filterBlock && <Box sx={{
            fontSize: '18px',
            position: 'absolute',
            fontWeight: 900,
            color: "#ccc",
            zIndex: -1,
            right: 10
          }}>
            条件
          </Box>}
        </Box>
      </Box>
    </Box>)
}