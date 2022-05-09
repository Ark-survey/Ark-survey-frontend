import { Box, Overlay } from "@mantine/core";
import { useDrop } from "react-dnd";
import OptList from "./components/OptList";
import { ItemTypes } from "src/common";
import { OptDragItem } from "./components/OptListItem";
import { optState } from "src/store/optState";
import { tierState } from "src/store/tierState";
import { filterHeightState, filterState } from "src/store/filterState";
import { useAtom } from "jotai";

export default function OptListItem() {
  const [filters] = useAtom(filterState);
  const [tiers, setTiers] = useAtom(tierState);
  const [opts, setOpts] = useAtom(optState);
  const [filterHeight] = useAtom(filterHeightState);

  const handleOptReturn = ({ fromTierIndex, opt }: OptDragItem) => {
    console.log(tiers);

    const index = opts.findIndex((o: any) => o.id === opt.id)
    const newOpts = opts.map(
      (item, i) => {
        if (index === i) {
          return {
            ...item,
            selected: false
          }
        }
        return item
      }
    )
    setOpts(newOpts)

    let newTiers = tiers.map(item => ({ ...item }))
    newTiers[fromTierIndex ?? 0].optIds = newTiers[
      fromTierIndex ?? 0
    ].optIds.filter((item) => item !== opt.id)
    setTiers(newTiers)
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.OPERATOR,
      drop: handleOptReturn,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );
  return (
    <Box
      ref={drop}
      sx={{
        height: filters.fold ? "calc(100% - 85px - " + filterHeight + "px)" : "calc(100% -  85px - " + filterHeight + "px)",
        margin: "0 13px",
        overflow: "hidden",
        transition: 'height 1s',
        // border: '2px #ccc solid',
        borderRadius: '0 0 20px 20px',
        position: 'relative',
      }}>
      {isOver &&
        <Overlay
          opacity={0.6}
          color="#000"
          zIndex={6}
          sx={{
            color: "#fff",
            display: "flex",
            fontSize: isOver ? '24px' : '30px',
            fontWeight: 600,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {"拖到这里放回干员"}
        </Overlay>}
      <Box sx={{
        height: '100%',
        "::-webkit-scrollbar": { width: "0 !important" },
        overflow: "auto",
      }}>
        <OptList />
      </Box>
    </Box>
  )
}