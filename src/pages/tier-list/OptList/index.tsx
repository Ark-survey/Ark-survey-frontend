import { Box, Image } from "@mantine/core";
import { opData } from "src/contexts";
import OptListItem, { OptListItemType } from "./components/OptListItem";

export default function OptList({
  filters,
  filterOpen = false,
}: {
  filters: { [x: string]: string[] };
  filterOpen?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        padding: "5px",
        paddingBottom: "0",
      }}
    >
      {opData
        .sort((a, b) => {
          const diff = parseInt(a.time) - parseInt(b.time);
          if (diff === 0) {
            if (a.accessChannel === "限定寻访") return -1;
            if (a.accessChannel === "普通寻访") return 0;
            if (a.accessChannel === "活动赠送") return 1;
          }
          return diff;
        })
        .filter((value) => {
          let flag = true;
          if (filterOpen) {
            for (let key in filters) {
              if (
                filters[key].length > 0 &&
                filters[key].indexOf(value[key]) < 0
              )
                flag = false;
            }
          }
          return flag;
        })
        .map((opt) => (
          <OptListItem key={opt.id} opt={opt} type={OptListItemType.NORMAL} />
        ))}
    </Box>
  );
}
