import { Box } from "@mantine/core";
import { useMemo } from "react";
import { timeMarks } from "src/contexts";
import OptListItem, { OptListItemType } from "./OptListItem";

import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { filterOpenState } from "src/store/slice/filterSlice";

export default function OptList() {
  const opts = useSelector((state: RootState) => state.opts);
  const filters = useSelector((state: RootState) => state.filters);
  const filterOpen = useSelector(filterOpenState);

  const orderlyList = useMemo(() => {
    return [...opts]
      .sort((a: any, b: any) => {
        const diff = parseInt(a.ts) - parseInt(b.ts);
        if (diff === 0) {
          if (a.accessChannel === "限定寻访") return -1;
          if (a.accessChannel === "普通寻访") return 0;
          if (a.accessChannel === "活动赠送") return 1;
        }
        return diff;
      })
  }, [opts])


  const list = useMemo(() => {
    return (
      orderlyList.filter((opt: any) => {
        if (filterOpen) {
          const startTime = timeMarks[0].ts
          const endTime = timeMarks[timeMarks.length - 1].ts
          const tsRange = endTime - startTime
          if (filters.dateRange[0] * tsRange / 100 + startTime > opt.ts || filters.dateRange[1] * tsRange / 100 + startTime < opt.ts) {
            return false
          }
          else {
            for (let key in filters.chipGroup) {
              if (filters.chipGroup[key].length > 0 &&
                filters.chipGroup[key].indexOf(opt[key]) < 0
              ) {
                return false;
              }
            }
          }
        }
        return true;
      })
        .map((opt: any) => (
          <>
            <OptListItem key={opt.id} opt={opt} type={OptListItemType.NORMAL} />
          </>
        ))
    )
  }, [filterOpen, filters.chipGroup, filters.dateRange, orderlyList])

  return (
    <Box
      sx={{
        paddingTop: "5px",
      }}
    >
      {list}
    </Box>
  );

}