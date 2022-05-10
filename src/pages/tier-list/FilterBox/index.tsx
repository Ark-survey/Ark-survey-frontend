import { Button, Box, Badge, createStyles } from "@mantine/core";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo } from "react";
import { rate, profession, accessChannel, sex, deployment, timeMarks } from "src/contexts";
import { filterHeightState, changeChipGroup, changeDateRange, reset } from "src/store/slice/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { ChipGroups } from "../components/ChipGroups";
import { DateSelect } from "../components/DateSelect";

const useStyles = createStyles((theme, _params, getRef) => ({
  badge: {
    marginRight: '15px',
    width: '100%'
  },
}));

export default function Index() {
  const filters = useSelector((state: RootState) => state.filters);
  const filterHeight = useSelector(filterHeightState);
  const dispatch = useDispatch();

  const { classes } = useStyles();

  const handleDateSelectChange = useCallback(
    (values: [number, number]) => {
      dispatch(changeDateRange(values));
    },
    [dispatch]
  );

  const handleChipsChange = useCallback(
    (values: string[], groupName: string) => {
      dispatch(
        changeChipGroup({
          ...filters.chipGroup,
          [groupName]: values
        }));
    },
    [dispatch, filters]
  );

  const handleResetFilter = useCallback(
    () => {
      dispatch(reset());
    },
    [dispatch]
  )

  useEffect(() => {
    handleResetFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chipGroupList = useMemo(() => {
    return (
      <>
        <ChipGroups
          label={"星级"}
          tags={rate}
          values={filters.chipGroup["rate"]}
          onChange={(values) => handleChipsChange(values, "rate")}
        />
        <ChipGroups
          label={"职业"}
          tags={profession}
          values={filters.chipGroup["profession"]}
          onChange={(values) => handleChipsChange(values, "profession")}
        />
        <ChipGroups
          label={"获取渠道"}
          tags={accessChannel}
          values={filters.chipGroup["accessChannel"]}
          onChange={(values) => handleChipsChange(values, "accessChannel")}
        />
        <ChipGroups
          label={"性别"}
          tags={sex}
          values={filters.chipGroup["sex"]}
          onChange={(values) => handleChipsChange(values, "sex")}
        />
        <ChipGroups
          label={"部署位"}
          tags={deployment}
          values={filters.chipGroup["deployment"]}
          onChange={(values) => handleChipsChange(values, "deployment")}
        />
      </>
    )
  }, [filters.chipGroup, handleChipsChange])

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
        (<Box sx={{ color: '#aaa', fontWeight: 900, lineHeight:'30px' }}>{"未筛选"}</Box>) :
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
              <Badge>{'获取渠道：' + filters.chipGroup["accessChannel"].map(i=>i.slice(0,2)).join(',')}</Badge></Box>}
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
        height: filterHeight,
        padding: "0 10px",
        overflow: "hidden",
        position: 'relative',
      }}
    >
      <Box sx={{
        transition: 'all 1s',
        marginTop: filters.fold ? '-532px' : '0'
      }}>
        <DateSelect
          value={filters["dateRange"]} label={"干员实装时间"} onChange={handleDateSelectChange} />
        {chipGroupList}
      </Box>
      <Box
        sx={{
          width:'calc(114px + 100%)',
          display: 'flex',
          justifyContent: 'end',
          position:'absolute',
          transition: 'all 1s',
          height: "40px",
          marginRight: filters.fold ? '0' : '-100%',
          bottom: filters.fold ? filterHeight - 47 : '0',
          right: filters.fold ? '0' : '12px'
        }}
      >
        <Button variant="outline" color="dark" radius="xl" size="xs" onClick={handleResetFilter}>
          重置为全部干员
        </Button>
        <Box sx={{
          width: 'calc(100% - 114px)',
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
