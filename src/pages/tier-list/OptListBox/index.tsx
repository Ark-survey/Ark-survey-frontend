import { Box, Overlay } from "@mantine/core";
import { useDrop } from "react-dnd";
import OptList from "./components/OptList";
import { FilterType } from "../FilterBox";
import { ItemTypes } from "src/common";
import { OptDragItem } from "./components/OptListItem";

interface OptListItemProps {
  opData: {
    [x: string]: any;
  };
  filters: FilterType;
  filterHeight: number;
  filterOpen: boolean;
  onOptReturn: (item: OptDragItem) => void;
}

export default function OptListItem({
  opData,
  filters,
  filterHeight,
  filterOpen,
  onOptReturn
}: OptListItemProps) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.OPERATOR,
      drop: onOptReturn,
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
        <OptList data={opData} filters={filters} filterOpen={filterOpen} />
      </Box>
    </Box>
  )
}