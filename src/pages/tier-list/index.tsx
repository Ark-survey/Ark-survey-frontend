import { Box, Button } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "src/components/Header";
import { opData } from "src/contexts";
import DraggableTierList from "./components/DraggableTierList";
import { Tier } from "./components/DraggableTierList/components/TierBox";
import FilterBox, { FilterType } from "./FilterBox";
import OptListBox from "./OptListBox";
import { OptDragItem, OptListItemType } from "./OptListBox/components/OptListItem";


export default function Index() {
  const [opDataCache, setOpDataCache] = useState(opData)

  const [tierList, setTierList] = useState<Tier[]>([
    {
      value: 0,
      optIds: [],
    },
    {
      value: 0.5,
      optIds: [],
    },
    {
      value: 1,
      optIds: [],
    },
    {
      value: 1.5,
      optIds: [],
    },
    {
      value: 2,
      optIds: [],
    },
    {
      value: 3,
      optIds: [],
    },
    {
      value: 4,
      optIds: [],
    },
  ]);

  const [filters, setFilters] = useState<FilterType>({
    fold: true,
    chipGroup: {
      opRate: [],
      profession: [],
      sex: [],
      rate: [],
      deployment: [],
      accessChannel: [],
    },
    dateRange: [0, 100],
  });

  const handleDateSelectChange = useCallback(
    (values: [number, number]) => {
      setFilters((state) => {
        state.dateRange = [...values];
        return {
          ...state,
        };
      });
    },
    []
  );

  const handleChipsChange = useCallback(
    (values: string[], groupName: string) => {
      setFilters((state) => {
        state.chipGroup = {
          ...state.chipGroup,
          [groupName]: values
        }
        return {
          ...state,
        };
      });
    },
    []
  );

  const handleResetFilter = useCallback(
    () => {
      setFilters(f => ({
        fold: f.fold,
        chipGroup: {
          opRate: [],
          profession: [],
          sex: [],
          rate: [],
          deployment: [],
          accessChannel: [],
        },
        dateRange: [0, 100],
      }));
    },
    []
  )

  const handleFoldStatusChange = useCallback(
    () => {
      setFilters(f => {
        return {
          ...f,
          fold: !f.fold
        }
      })
    },
    []
  )

  const handleDropOptOnTier = useCallback(
    ({ opt, type, fromTierIndex }: OptDragItem, toTierIndex: number) => {
      if (fromTierIndex !== toTierIndex) {
        setOpDataCache(d => {
          d[d.findIndex((o) => o.id === opt.id)].selected = true;
          return [...d]
        })
        setTierList((list) => {
          list[toTierIndex].optIds = [...list[toTierIndex].optIds, opt.id];
          return [...list];
        });

        if (type === OptListItemType.TIER) {
          setTierList((list) => {
            list[fromTierIndex ?? 0].optIds = list[
              fromTierIndex ?? 0
            ].optIds.filter((item) => item !== opt.id);
            return [...list];
          });
        }
      }
    },
    []
  );

  const handleOptReturn = useCallback(({ fromTierIndex, opt }: OptDragItem) => {
    setOpDataCache(d => {
      d[d.findIndex((o) => o.id === opt.id)].selected = false;
      return [...d]
    })
    setTierList((list) => {
      list[fromTierIndex ?? 0].optIds = list[fromTierIndex ?? 0].optIds.filter((item) => item !== opt.id);
      return [...list];
    });
  }, [])

  const filterHeight = useMemo(() => {
    let sum = 0
    for (let i in filters.chipGroup) {
      if (filters.chipGroup[i].length > 0) sum++
    }
    if (filters.dateRange[0] !== 0 || filters.dateRange[1] !== 100) sum++
    if (sum <= 1)
      return filters.fold ? 40 : 590
    else
      return filters.fold ? 40 + (sum - 1) * 22 : 590
  }, [filters.chipGroup, filters.dateRange, filters.fold])

  useEffect(() => {
    handleResetFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterOpen = useMemo(() => {
    let flag = false;
    for (let f in filters.chipGroup) {
      if (filters.chipGroup[f].length !== 0) flag = true;
    }
    if (filters.dateRange[0] !== 0 || filters.dateRange[1] !== 100)
      flag = true;
    return flag;
  }, [filters.chipGroup, filters.dateRange]);

  return (
    <Box
      sx={{
        maxWidth: "1210px",
        display: "flex",
        margin: "0 auto",
        marginTop: "100px",
      }}
    >
      <Box
        sx={{
          width: "480px",
          boxShadow: "0 0 5px 5px #eee",
          borderRadius: "20px",
          userSelect: "none",
          maxHeight: '890px'
        }}
      >
        <Header title="干员盒">
          <Button variant="outline" radius="xl" onClick={handleFoldStatusChange}>
            {filters.fold ? '展开筛选面板' : '收起筛选面板'}
          </Button>
        </Header>
        <FilterBox
          filters={filters}
          height={filterHeight}
          onChipsChange={handleChipsChange}
          onDateSelectChange={handleDateSelectChange}
          onResetFilter={handleResetFilter}
          onFoldStatusChange={handleFoldStatusChange} />
        <OptListBox
          opData={opDataCache}
          filters={filters}
          filterHeight={filterHeight}
          filterOpen={filterOpen}
          onOptReturn={handleOptReturn} />
        <Box sx={{ width: "100%", height: "15px" }}></Box>
      </Box>
      <DraggableTierList tierList={tierList} onDropOptOnTier={handleDropOptOnTier} />
    </Box >
  );
}
