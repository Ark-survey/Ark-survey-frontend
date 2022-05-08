import { Box, Image, Overlay } from "@mantine/core";
import { ItemTypes } from "src/common";
import { useDrag } from "react-dnd";

export enum OptListItemType {
  NORMAL,
  TIER,
}

interface OptListItemProps {
  opt: {
    [x: string]: string;
  };
  type: OptListItemType;
  fromTierIndex?: number;
}

export interface OptDragItem {
  type: OptListItemType;
  opt: { [x: string]: any };
  fromTierIndex?: number;
}

export default function OptListItem({
  opt,
  type,
  fromTierIndex,
}: OptListItemProps) {
  const [{ isDragging }, dragger] = useDrag(
    () => ({
      type: ItemTypes.OPERATOR,
      item: { type, opt, fromTierIndex } as OptDragItem,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );
  return (
    <Box
      key={opt.id}
      ref={opt.selected && type === OptListItemType.NORMAL ? null : dragger}
      sx={{
        margin: "5px",
        width: 80,
        height: 80,
        boxShadow: "inset 0px 0px 10px 4px #ccc",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {(isDragging || (opt.selected && type === OptListItemType.NORMAL)) && (
        <Overlay
          opacity={0.6}
          color="#000"
          zIndex={5}
          sx={{
            color: "#fff",
            display: "flex",
            fontWeight: 600,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isDragging ? "拖动中" : "已选择"}
        </Overlay>
      )}
      <Image src={opt.imgUrl} width="80" height="80" alt={opt.name} />
    </Box>
  );
}
