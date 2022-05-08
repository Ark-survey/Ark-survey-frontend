import { Box, Image, createStyles, RangeSlider, Button } from "@mantine/core";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { API } from "src/api";
import useSWR from "swr";
import DraggableTierList from "./components/DraggableTierList";
import FilterBox, { FilterType } from "./FilterBox";
import OptList from "./OptList";


export default function Index() {
  // const { data, error } = useSWR(API.charList.get);

  const [filters, setFilters] = useState<FilterType>({
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
        }}
      >
        <FilterBox filters={filters} onChipsChange={handleChipsChange} onDateSelectChange={handleDateSelectChange} />
        <Box
          sx={{
            height: "365px",
            overflow: "auto",
            padding: "10px",
            paddingBottom: "0",
            "::-webkit-scrollbar": { width: "0 !important" },
          }}
        >
          <OptList filters={filters} filterOpen={filterOpen} />
        </Box>
        <Box sx={{ width: "100%", height: "15px" }}></Box>
      </Box>
      <Box
        sx={{
          width: "710px",
          boxShadow: "0 0 5px 5px #eee",
          marginLeft: "20px",
          borderRadius: "20px",
          overflow: "hidden",
          maxHeight: "1000px",
          userSelect: "none",
        }}
      >
        <DraggableTierList />
      </Box>
    </Box>
  );
}
