import { ActionIcon, Box } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
import DeleteTier from "./DeleteTierPopover";
import EditTierPopover from "./EditTierPopover";
import { useDrop } from "react-dnd";
import { ItemTypes } from "src/common";
import { opData } from "src/contexts";
import OptListItem, {
  OptDragItem,
  OptListItemType,
} from "src/pages/tier-list/OptListBox/components/OptListItem";

export interface Tier {
  value: number;
  optIds: string[];
}

/**
 * @param value tier value
 */
interface TierBoxProps {
  tier: Tier;
  tierIndex: number;
  operationDisplay?: boolean;
  onDropOpt: (item: OptDragItem) => void;
}

export default function TierBox({
  tier,
  operationDisplay = false,
  tierIndex,
  onDropOpt,
}: TierBoxProps) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.OPERATOR,
      drop: onDropOpt,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );
  const optIMgList = useMemo(() => {
    const opts = opData.filter((opt) => tier.optIds.indexOf(opt.id) > -1);
    let cache = [];
    for (let i in opts) {
      if (i === "4") {
        cache.push(
          <Box sx={{ width: "90px" }}></Box>,
          <Box sx={{ width: "90px" }}></Box>,
          <Box sx={{ width: "90px" }}></Box>
        );
      }
      cache.push(
        <OptListItem
          key={opts[i].id}
          opt={opts[i]}
          fromTierIndex={tierIndex}
          type={OptListItemType.TIER}
        />
      );
    }
    return cache;
  }, [tier.optIds, tierIndex]);

  return (
    <>
      <Box
        ref={drop}
        sx={{
          boxSizing: "border-box",
          width: "calc(100% - 20px)",
          border: isOver ? "2px #ccc solid" : "2px #ccc dashed",
          borderRadius: "20px",
          minHeight: "115px",
          position: "relative",
          margin: "0 10px",
          marginBottom: "20px",
          marginTop: "5px",
        }}
      >
        <Box sx={{ padding: "10px", display: "flex", flexFlow: "row wrap" }}>
          {optIMgList}
        </Box>
        <Box
          sx={{
            position: "absolute",
            background: "#fff",
            fontWeight: 600,
            fontSize: "12px",
            padding: "2px 5px",
            top: "-12px",
            left: "20px",
          }}
        >
          {"T " + tier.value}
        </Box>
        {operationDisplay && (
          <Box
            sx={{
              position: "absolute",
              top: "30px",
              left: "-10px",
            }}
          >
            <EditTierPopover />
            <Box sx={{ height: "5px" }} />
            <DeleteTier />
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            fontSize: "65px",
            right: "20px",
            lineHeight: "110px",
            fontWeight: 900,
            color: "#eee",
            top: 0,
            zIndex: -1,
            WebkitTextStroke: isOver ? "2px #ccc" : "2px #eee",
            WebkitTextFillColor: isOver ? "" : "transparent",
          }}
        >
          {"Tier " + tier.value}
        </Box>
      </Box>
    </>
  );
}
