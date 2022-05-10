import { Box, Overlay } from "@mantine/core";
import { useDrop } from "react-dnd";
import OptList from "./components/OptList";
import { ItemTypes } from "src/common";
import { OptDragItem } from "./components/OptListItem";

import { delOptByTier } from 'src/store/slice/tierSlice';
import { updateOptPicked } from 'src/store/slice/optSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { filterHeightState } from "src/store/slice/filterSlice";
import { useChangeSize } from "src/hooks";

export default function OptListItem() {
  const filters = useSelector((state: RootState) => state.filters);
  const opts = useSelector((state: RootState) => state.opts);
  const filterHeight = useSelector(filterHeightState);
  const dispatch = useDispatch();

  const size = useChangeSize()

  const handleOptReturn = ({ fromTierValue, opt }: OptDragItem) => {
    const index = opts.findIndex((o: any) => o.id === opt.id)
    dispatch(updateOptPicked({ optIndex: index, value: false }))

    dispatch(delOptByTier({
      tierValue: fromTierValue ?? 0,
      optId: opt.id
    }))
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
        maxHeight: size.width < 720 ? (filters.mini ? '160px' : '600px') : '',
        height: filters.fold ? "calc(100% - 85px - " + filterHeight + "px)" : "calc(100% -  85px - " + filterHeight + "px)",
        margin: "0 13px",
        overflow: "hidden",
        transition: 'all 1s',
        // border: '2px #ccc solid',
        borderRadius: '0 0 20px 20px',
        position: 'relative'
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
            justifyContent: "center"
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