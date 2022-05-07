import { Box, Button } from "@mantine/core";
import { useCallback, useState } from "react";
import { opData } from "src/contexts";
import {
  OptDragItem,
  OptListItemType,
} from "../../OptList/components/OptListItem";
import AddTierPopover from "./components/AddTierPopover";
import ResetAllOptPopover from "./components/ResetAllOptPopover";
import TierBox, { Tier } from "./components/TierBox";
import UploadPopover from "./components/UploadPopover";

export default function Index() {
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

  const onDropOpt = useCallback(
    ({ opt, type, fromTierIndex }: OptDragItem, toTierIndex: number) => {
      if (fromTierIndex !== toTierIndex) {
        const selectOpt = opData.filter((o) => o.id === opt.id);
        if (selectOpt?.length > 0) {
          selectOpt[0].selected = "true";
        }
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

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          borderBottom: "2px #eee solid",
          padding: "15px",
        }}
      >
        <Box
          sx={{
            flex: "1",
            fontSize: "20px",
            lineHeight: "36px",
            paddingLeft: 5,
            fontWeight: 900,
          }}
        >
          等级表编辑
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <ResetAllOptPopover />
          <Box sx={{ width: "10px" }}></Box>
          <AddTierPopover />
          <Box sx={{ width: "10px" }}></Box>
          <Button variant="outline" color="dark" radius="xl" onClick={() => {}}>
            生成截图
          </Button>
          <Box sx={{ width: "10px" }}></Box>
          <UploadPopover />
        </Box>
      </Box>
      <Box
        sx={{
          height: "900px",
          overflow: "auto",
          margin: "15px",
          "::-webkit-scrollbar": { width: "0 !important" },
        }}
      >
        {tierList.map((tier, tierIndex) => (
          <TierBox
            key={tier.value}
            tier={tier}
            tierIndex={tierIndex}
            onDropOpt={(item) => onDropOpt(item, tierIndex)}
            operationDisplay
          />
        ))}
      </Box>
    </Box>
  );
}
