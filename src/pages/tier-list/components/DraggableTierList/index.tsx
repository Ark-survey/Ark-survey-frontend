import { Box, Button } from "@mantine/core";
import Header from "src/components/Header";

import { delCharacterByTier, addCharacterByTier } from 'src/store/slice/tierSlice';
import { updateCharacterPicked, updateCharacterSelecting } from 'src/store/slice/characterSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";

import {
  CharacterDragItem, CharacterListItemType,
} from "../../CharacterListBox/components/CharacterListItem";
import AddTierPopover from "./components/AddTierPopover";
import ResetAllCharacterPopover from "./components/ResetAllCharacterPopover";
import TierBox from "./components/TierBox";
import UploadPopover from "./components/UploadPopover";
import { useRef, useState } from "react";
import { capture } from "src/utils/CaptureUtils";
// import html2canvas from "html2canvas";
import { format } from "date-fns";

export default function Index() {
  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const characters = useSelector((state: RootState) => state.characters);
  const dispatch = useDispatch();
  const tiersBox = useRef<HTMLDivElement>(null);

  const [makingImg, setMakingImg] = useState(false)

  const handleDropCharacterOnTier = ({ character, type, fromTierValue }: CharacterDragItem, toTierValue: number) => {
    console.log(type === CharacterListItemType.TIER && fromTierValue !== toTierValue);

    if (type === CharacterListItemType.NORMAL || (type === CharacterListItemType.TIER && fromTierValue !== toTierValue)) {
      const index = characters.findIndex((o: any) => o.id === character.id)
      dispatch(updateCharacterPicked({ characterIndex: index, value: true }))
      dispatch(updateCharacterSelecting({ characterIndex: index, value: false }))

      if (type === CharacterListItemType.TIER) {
        dispatch(
          delCharacterByTier({
            tierValue: fromTierValue ?? 0,
            characterId: character.id
          }
          ))
      }

      dispatch(
        addCharacterByTier({
          tierValue: toTierValue,
          characterId: character.id
        })
      )
    }
  };

  const makeTierImg = () => {
    setMakingImg(true)
    setTimeout(() => {
      if (tiersBox.current) {
        capture(tiersBox.current.id, '等级表 ' + format(new Date().getTime(), 'yy-MM-dd hh-mm-ss'))
      }
      setMakingImg(false)
    })
  }

  return (
    <Box
      sx={{
        flex: '1.5',
        width: "100%",
        boxShadow: "0 0 5px 5px #eee",
        borderRadius: "20px",
        maxHeight: "890px",
        overflow: 'hidden',
        userSelect: "none",
        minWidth: "326px",
      }}>
      <Header title="等级表编辑">
        <ResetAllCharacterPopover />
        <Box sx={{ width: "10px" }}></Box>
        <AddTierPopover />
        <Box sx={{ width: "10px" }}></Box>
        <Button size='xs' variant="outline" color="blue" radius="xl" onClick={makeTierImg}>
          截图
        </Button>
        <Box sx={{ width: "10px" }}></Box>
        <UploadPopover />
      </Header>
      <Box
        sx={{
          overflow: "auto",
          height: "calc(100% - 100px)",
          "::-webkit-scrollbar": { width: "0 !important" },
        }}>
        <Box
          ref={tiersBox}
          id="tierList"
          sx={{
            overflow: "auto",
            marginTop: '2px',
            background: '#fff'
          }}
        >
          <Box
            sx={{
              margin: "15px",
            }}
          >
            {tiers.map((tier) => (
              <TierBox
                key={tier.value}
                tier={tier}
                onDropCharacter={(item) => handleDropCharacterOnTier(item, tier.value)}
                operationDisplay={!makingImg}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: "15px" }}></Box>
    </Box>
  );
}
