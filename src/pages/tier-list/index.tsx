import { Box, Button, Container, Stack } from "@mantine/core";
import Header from "src/components/Header";
import DraggableTierList from "./components/DraggableTierList";
import FilterBox from "./FilterBox";
import CharacterListBox from "./CharacterListBox";

import { changeFold, changeNameDisplay, changeMini } from 'src/store/slice/filterSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { FoldDown, FoldUp } from "tabler-icons-react";
import LoadDataPaper from "./LoadDataPaper";

export default function Index() {
  const filters = useSelector((state: RootState) => state.filters);
  const userTierList = useSelector((state: RootState) => state.userTierList);
  const newTierList = useSelector((state: RootState) => state.user.newTierList);
  const dispatch = useDispatch();

  const handleMiniStatusChange = () => {
    dispatch(changeMini(!filters.mini))
  }

  const handleNameStatusChange = () => {
    dispatch(changeNameDisplay(!filters.nameDisplay))
  }

  const handleFoldStatusChange = () => {
    dispatch(changeFold(!filters.fold))
  }

  return (
    newTierList || (!newTierList && userTierList?.id) ?
      (<Container size={1400} >
        < Stack
          spacing={20}
          sx={{
            flexFlow: "row wrap",
            alignItems: "stretch"
          }
          }
        >
          <Box
            sx={{
              flex: '1',
              minWidth: "326px",
              maxWidth: "726px",
              boxShadow: "0 0 5px 5px #eee",
              borderRadius: "20px",
              userSelect: "none",
              maxHeight: '890px',
              overflow: 'hidden'
            }}>
            <Box
              sx={{
                overflow: "auto",
                height: '100%',
                "::-webkit-scrollbar": { width: "0 !important" },
              }}
            >
              <Header title="干员盒">
                <Button size="xs" variant={!filters.mini ? "outline" : "filled"} color={!filters.mini ? "blue" : "green"} radius="xl" onClick={handleMiniStatusChange}>
                  {'MINI'}
                </Button>
                <Box sx={{ width: '15px' }}></Box>
                <Button size="xs" variant={!filters.nameDisplay ? "outline" : "filled"} color={!filters.nameDisplay ? "blue" : "green"} radius="xl" onClick={handleNameStatusChange}>
                  {'名称'}
                </Button>
                <Box sx={{ width: '15px' }}></Box>
                <Button size="xs" variant="outline" radius="xl" onClick={handleFoldStatusChange}>
                  {filters.fold ? <FoldDown /> : <FoldUp />}
                  {/* { filters.fold ? '展开' : '收起'} */}
                </Button>
              </Header>
              <FilterBox />
              <CharacterListBox />
              <Box sx={{ width: "100%", height: "15px" }}></Box>
            </Box>
          </Box>
          <DraggableTierList />
        </Stack >
      </Container >)
      : <LoadDataPaper />
  );
}
