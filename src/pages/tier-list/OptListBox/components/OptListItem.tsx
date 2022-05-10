import { Box, Image, Overlay } from "@mantine/core";
import { ItemTypes } from "src/common";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

export enum OptListItemType {
  NORMAL,
  TIER,
}

interface OptListItemProps {
  opt?: {
    [x: string]: string;
  };
  type?: OptListItemType;
  fromTierValue?: number;
  empty?: boolean
}

export interface OptDragItem {
  type: OptListItemType;
  opt: { [x: string]: any };
  fromTierValue?: number;
}

export default function OptListItem({
  opt,
  type,
  fromTierValue,
  empty
}: OptListItemProps) {
  const filters = useSelector((state: RootState) => state.filters);

  const [{ isDragging }, dragger] = useDrag(
    () => ({
      type: ItemTypes.OPERATOR,
      item: { type, opt, fromTierValue } as OptDragItem,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );
  return (
    <>
      <Box
        key={opt?.id}
        ref={opt?.selected && type === OptListItemType.NORMAL ? null : dragger}
        sx={{
          margin: empty ? "0 5px" : "5px",
          width: filters.mini ? 40 : 80,
          // maxHeight: filters.mini ? 40 : 80,
          boxShadow: "inset 0px 0px 10px 4px #ccc",
          backgroundRepeat: 'no-repeat',
          borderRadius: filters.mini ? '50%' : "20px",
          overflow: "hidden",
          position: "relative",
          flex: type === OptListItemType.NORMAL ? ('auto') : '',
          height: empty ? '0' : 'auto'
        }}
      >
        {(isDragging || (opt?.selected && type === OptListItemType.NORMAL)) && (
          <Overlay
            opacity={0.6}
            color="#000"
            zIndex={5}
            sx={{
              color: "#fff",
              display: "flex",
              fontWeight: 600,
              fontSize: filters.mini ? '10px' : '',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isDragging ? "拖动中" : "已选择"}
          </Overlay>
        )}
        {filters.nameDisplay &&
          <Box sx={{
            position: 'absolute', zIndex: 4, bottom: filters.mini ? '' : '0', top: filters.mini ? '3px' : '', left: filters.mini ? '-10px' : '0px', width: filters.mini ? '150%' : '100%',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
            height: filters.mini ? '8px' : '14px',
            background: 'linear-gradient(to top, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 90%, rgba(255,249,242,0) 100%)'
          }}>
            <Box sx={
              {
                textAlign: 'center',
                fontSize: '10px',
                fontWeight: 700,
                height: filters.mini ? '10px' : '15px',
                transform: filters.mini ? 'scale(0.5)' : ''
              }
            }>
              {opt?.name}
            </Box>
          </Box>
        }
        <Image src={opt?.imgUrl} width="80" height="80" alt={opt?.name} />
      </Box>
    </>
  );
}