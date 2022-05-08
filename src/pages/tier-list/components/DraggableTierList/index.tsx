import { Box, Button } from "@mantine/core";
import Header from "src/components/Header";
import {
  OptDragItem,
} from "../../OptListBox/components/OptListItem";
import AddTierPopover from "./components/AddTierPopover";
import ResetAllOptPopover from "./components/ResetAllOptPopover";
import TierBox, { Tier } from "./components/TierBox";
import UploadPopover from "./components/UploadPopover";

interface DraggableTierListProps {
  tierList: Tier[],
  onDropOptOnTier: (item: OptDragItem, toTierIndex: number) => void;
}

export default function Index({ tierList, onDropOptOnTier }: DraggableTierListProps) {

  return (
    <Box
      sx={{
        width: "710px",
        boxShadow: "0 0 5px 5px #eee",
        marginLeft: "20px",
        borderRadius: "20px",
        overflow: "hidden",
        maxHeight: "890px",
        userSelect: "none",
      }}>
      <Header title="等级表编辑">
        <ResetAllOptPopover />
        <Box sx={{ width: "10px" }}></Box>
        <AddTierPopover />
        <Box sx={{ width: "10px" }}></Box>
        <Button variant="outline" color="dark" radius="xl" onClick={() => { }}>
          生成截图
        </Button>
        <Box sx={{ width: "10px" }}></Box>
        <UploadPopover />
      </Header>
      <Box sx={{
        overflow: "auto",
        marginTop: '2px',
        height: 'calc(100% - 68px)',
        "::-webkit-scrollbar": { width: "0 !important" },
      }}>
        <Box
          sx={{
            margin: "15px",
          }}
        >
          {tierList.map((tier, tierIndex) => (
            <TierBox
              key={tier.value}
              tier={tier}
              tierIndex={tierIndex}
              onDropOpt={(item) => onDropOptOnTier(item, tierIndex)}
              operationDisplay
            />
          ))}
        </Box></Box>
    </Box>
  );
}
