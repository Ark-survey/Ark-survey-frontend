import { Box, Image, Overlay } from "@mantine/core";
import { ItemTypes } from "src/common";
import { useDrag } from "react-dnd";
import { RootState } from "src/store";
import { CharacterType, updateCharacterSelecting } from "src/store/slice/characterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useIsMobile } from "src/hooks";

export enum CharacterListItemType {
  NORMAL,
  TIER,
}

interface CharacterListItemProps {
  character?: CharacterType;
  type?: CharacterListItemType;
  fromTierValue?: number;
  empty?: boolean
}

export interface CharacterDragItem {
  type: CharacterListItemType;
  character: { [x: string]: any };
  fromTierValue?: number;
}

export default function CharacterListItem({
  character,
  type,
  fromTierValue,
  empty
}: CharacterListItemProps) {
  const filters = useSelector((state: RootState) => state.filters);
  const characters = useSelector((state: RootState) => state.characters);
  const dispatch = useDispatch();
  const isMobile = useIsMobile()

  const [{ isDragging }, dragger] = useDrag(
    () => ({
      type: ItemTypes.OPERATOR,
      item: { type, character, fromTierValue } as CharacterDragItem,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  const handleCharacterSelect = () => {
    if (type === CharacterListItemType.NORMAL)
      dispatch(updateCharacterSelecting({ characterIndex: characters.findIndex(v => v.id === character?.id), value: !character?.selecting }))
  }

  return (
    <>
      <Box
        key={character?.id}
        ref={(character?.picked && type === CharacterListItemType.NORMAL) || (isMobile && type === CharacterListItemType.NORMAL) ? null : dragger}
        sx={{
          margin: empty ? "0 5px" : "5px",
          width: filters.mini ? 40 : 80,
          boxSizing: 'border-box',
          boxShadow: (character?.selecting && type === CharacterListItemType.NORMAL && !empty) ? "inset 0px 0px 10px 4px green" : "inset 0px 0px 10px 4px #ccc",
          backgroundRepeat: 'no-repeat',
          borderRadius: filters.mini ? '50%' : "20px",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          flex: type === CharacterListItemType.NORMAL ? ('auto') : '',
          height: empty ? '0' : 'auto'
        }}
      >
        {(isDragging || (character?.picked && type === CharacterListItemType.NORMAL)) && (
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
            {isDragging ? "拖动中" : "已选取"}
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
              {character?.name}
            </Box>
          </Box>
        }
        <Image src={character?.imgUrl} width="80" height="80" alt={character?.name} onClick={handleCharacterSelect} />
      </Box>
    </>
  );
}

