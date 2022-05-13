import { Box } from "@mantine/core";
import { useMemo } from "react";
import { timeMarks } from "src/contexts";
import CharacterListItem, { CharacterListItemType } from "./CharacterListItem";

import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { filterOpenState } from "src/store/slice/filterSlice";

export default function CharacterList() {
  const characters = useSelector((state: RootState) => state.characters);
  const filters = useSelector((state: RootState) => state.filters);
  const filterOpen = useSelector(filterOpenState);

  const orderlyList = useMemo(() => {
    return [...characters]
      .sort((a: any, b: any) => {
        const diff = parseInt(a.ts) - parseInt(b.ts);
        if (diff === 0) {
          if (a.accessChannel === "限定寻访") return -1;
          if (a.accessChannel === "普通寻访") return 0;
          if (a.accessChannel === "活动赠送") return 1;
        }
        return diff;
      })
      .filter((character: any) => {
        if (filterOpen) {
          const startTime = timeMarks[0].ts
          const endTime = timeMarks[timeMarks.length - 1].ts
          const tsRange = endTime - startTime
          if (filters.dateRange[0] * tsRange / 100 + startTime > character.ts || filters.dateRange[1] * tsRange / 100 + startTime < character.ts) {
            return false
          }
          else {
            for (let key in filters.chipGroup) {
              if (filters.chipGroup[key].length > 0 &&
                filters.chipGroup[key].indexOf(character[key]) < 0
              ) {
                return false;
              }
            }
          }
        }
        return true;
      })
  }, [filterOpen, filters.chipGroup, filters.dateRange, characters])


  const list = useMemo(() => {
    return (
      orderlyList
        .map((character: any, index: number) => {
          return (
            <>
              <CharacterListItem key={character.id} character={character} type={CharacterListItemType.NORMAL} />
              {index === orderlyList.length - 1 &&
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((i, index) => <CharacterListItem key={'e-' + index} empty type={CharacterListItemType.NORMAL} />)
              }
            </>
          )
        })
    )
  }, [orderlyList])

  return (
    <Box
      sx={{
        paddingTop: "5px",
        display: 'flex',
        flexFlow: 'row wrap'
      }}
    >
      {orderlyList.length > 0 ? list : <Box sx={{ width: '100%', textAlign: 'center', marginTop: '10px', color: '#ccc' }}>没有符合条件的干员</Box>}
    </Box>
  );

}