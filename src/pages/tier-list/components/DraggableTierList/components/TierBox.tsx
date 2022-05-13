import { Box } from "@mantine/core";
import { useMemo } from "react";
import DeleteTier from "./DeleteTierPopover";
import EditTierPopover from "./EditTierPopover";
import { useDrop } from "react-dnd";
import { ItemTypes } from "src/common";
import CharacterListItem, {
  CharacterDragItem,
  CharacterListItemType,
} from "src/pages/tier-list/CharacterListBox/components/CharacterListItem";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import AddCharactersToTierPopover from "./AddCharactersToTierPopover";
import { Tier } from "src/api/TierListServer";

/**
 * @param value tier value
 */
interface TierBoxProps {
  tier: Tier;
  operationDisplay?: boolean;
  onDropCharacter: (item: CharacterDragItem) => void;
}

export default function TierBox({
  tier,
  operationDisplay = false,
  onDropCharacter,
}: TierBoxProps) {
  const characters = useSelector((state: RootState) => state.characters);
  const filter = useSelector((state: RootState) => state.filters);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.OPERATOR,
      drop: onDropCharacter,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );
  const characterIMgList = useMemo(() => {
    const characterList = characters.filter((character) => tier.characterIds.indexOf(character.id) > -1);
    let cache = [];
    for (let i in characterList) {
      // if (i === "4") {
      //   cache.push(
      //     <Box sx={{ width: "90px" }}></Box>,
      //     <Box sx={{ width: "90px" }}></Box>,
      //     <Box sx={{ width: "90px" }}></Box>
      //   );
      // }
      cache.push(
        <CharacterListItem
          key={characterList[i].id}
          character={characterList[i]}
          fromTierValue={tier.value}
          type={CharacterListItemType.TIER}
        />
      );
    }
    return cache;
  }, [characters, tier.characterIds, tier.value]);

  return (
    <>
      <Box
        ref={drop}
        sx={{
          boxSizing: "border-box",
          width: "calc(100% - 20px)",
          border: isOver ? "2px #aaa solid" : "2px #ccc dashed",
          borderRadius: "20px",
          minHeight: filter.mini ? "75px" : '115px',
          position: "relative",
          margin: "0 10px",
          marginBottom: "20px",
          marginTop: "5px",
        }}
      >
        <Box sx={{ padding: "10px", display: "flex", flexFlow: "row wrap" }}>
          {characterIMgList}
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
          <>
            <Box
              sx={{
                position: "absolute",
                top: filter.mini ? "-10px" : "12px",
                left: filter.mini ? "" : "-10px",
                right: filter.mini ? "20px" : "",
                display: filter.mini ? 'flex' : ''
              }}
            >
              <AddCharactersToTierPopover tierValue={tier.value} />
              <Box sx={{ width: "6px", height: "4px" }} />
              <EditTierPopover tierValue={tier.value} />
              <Box sx={{ width: "6px", height: "4px" }} />
              <DeleteTier tierValue={tier.value} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                fontSize: filter.mini ? '40px' : "65px",
                right: "20px",
                lineHeight: filter.mini ? "75px" : '110px',
                fontWeight: 900,
                color: "#eee",
                top: 0,
                zIndex: 0,
                WebkitTextStroke: isOver ? "2px #ccc" : "2px #eee",
                WebkitTextFillColor: isOver ? "" : "transparent",
              }}
            >
              {"Tier " + tier.value}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
