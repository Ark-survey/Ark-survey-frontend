import { Box, Button } from "@mantine/core";
import Header from "src/components/Header";

import { delOptByTier, addOptByTier } from 'src/store/slice/tierSlice';
import { updateOptSelected } from 'src/store/slice/optSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";

import {
  OptDragItem, OptListItemType,
} from "../../OptListBox/components/OptListItem";
import AddTierPopover from "./components/AddTierPopover";
import ResetAllOptPopover from "./components/ResetAllOptPopover";
import TierBox from "./components/TierBox";
import UploadPopover from "./components/UploadPopover";

export default function Index() {
  const tiers = useSelector((state: RootState) => state.tiers);
  const opts = useSelector((state: RootState) => state.opts);
  const dispatch = useDispatch();

  const handleDropOptOnTier = ({ opt, type, fromTierIndex }: OptDragItem, toTierIndex: number) => {
    if (type === OptListItemType.NORMAL || (type === OptListItemType.TIER && fromTierIndex !== toTierIndex)) {
      const index = opts.findIndex((o: any) => o.id === opt.id)
      dispatch(updateOptSelected({ optIndex: index, value: true }))
      
      if (type === OptListItemType.TIER) {
        dispatch(
          delOptByTier({
            tierIndex: fromTierIndex ?? 0,
            optId: opt.id
          }
        ))
      }
      dispatch(
        addOptByTier({
          tierIndex: toTierIndex,
          optId: opt.id
        })
      )
    }
  };

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
          {tiers.map((tier, tierIndex) => (
            <TierBox
              key={tier.value}
              tier={tier}
              tierIndex={tierIndex}
              onDropOpt={(item) => handleDropOptOnTier(item, tierIndex)}
              operationDisplay
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
