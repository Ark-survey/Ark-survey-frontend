import { Box, Button } from "@mantine/core";
import { useRecoilState } from "recoil";
import Header from "src/components/Header";
import { optState } from "src/recoil/optState";
import { tierState } from "src/recoil/tierState";
import {
  OptDragItem, OptListItemType,
} from "../../OptListBox/components/OptListItem";
import AddTierPopover from "./components/AddTierPopover";
import ResetAllOptPopover from "./components/ResetAllOptPopover";
import TierBox from "./components/TierBox";
import UploadPopover from "./components/UploadPopover";

export default function Index() {
  const [tiers, setTiers] = useRecoilState(tierState);
  const [opts, setOpts] = useRecoilState(optState);

  const handleDropOptOnTier = ({ opt, type, fromTierIndex }: OptDragItem, toTierIndex: number) => {
    if (type === OptListItemType.NORMAL || (type === OptListItemType.TIER && fromTierIndex !== toTierIndex)) {
      const index = opts.findIndex((o: any) => o.id === opt.id)
      let newOpts = opts.map(
        (item, i) => {
          if (index === i) {
            return {
              ...item,
              selected: true
            }
          }
          return item
        }
      )
      setOpts(newOpts);

      let newTiers = tiers.map(item => ({ ...item }))
      if (type === OptListItemType.TIER) {
        newTiers[fromTierIndex ?? 0].optIds = tiers[
          fromTierIndex ?? 0
        ].optIds.filter((item) => item !== opt.id)
      }
      newTiers[toTierIndex].optIds = [...tiers[toTierIndex].optIds, opt.id]
      setTiers(newTiers)
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
