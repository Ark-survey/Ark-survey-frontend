import { useState } from "react";
import { Popover, Button, Box, Text, ActionIcon } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { updateCharacterPicked, updateCharacterSelecting } from 'src/store/slice/characterSlice';
import { addCharacterByTier } from 'src/store/slice/tierSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";

export default function AddCharactersToTierPopover({ tierValue }: { tierValue: number }) {
  const [opened, setOpened] = useState(false);
  const characters = useSelector((state: RootState) => state.characters);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    characters.forEach((character, index) => {
      if (character.selecting) {
        dispatch(updateCharacterPicked({ characterIndex: index, value: true }))
        dispatch(updateCharacterSelecting({ characterIndex: index, value: false }))
        dispatch(addCharacterByTier({ tierValue, characterId: character.id }))
      }
      return character
    })

    setOpened(false)
  }

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon
          sx={{
            background: "#fff",
          }}
          size="xs"
          radius="xs"
          onClick={() => setOpened((o) => !o)}
        >
          <Plus />
        </ActionIcon>
      }
      width={210}
      position="right"
      placement="center"
      withArrow
    >
      <Text size="sm">这会向该等级添加您选中的全部干员，确定要继续吗？</Text>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button
          sx={{ marginTop: "15px" }}
          radius="xl"
          color={"blue"}
          onClick={handleConfirm}
        >
          确认添加
        </Button>
      </Box>
    </Popover>
  );
}
