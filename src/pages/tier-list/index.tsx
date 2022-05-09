import { Box, Button } from "@mantine/core";
import Header from "src/components/Header";
import DraggableTierList from "./components/DraggableTierList";
import FilterBox from "./FilterBox";
import OptListBox from "./OptListBox";

import { changeFold } from 'src/store/slice/filterSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";

export default function Index() {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();

  const handleFoldStatusChange = () => {
    dispatch(changeFold(!filters.fold))
  }

  return (
    <Box
      sx={{
        maxWidth: "1210px",
        display: "flex",
        margin: "0 auto",
        marginTop: "100px",
      }}
    >
      <Box
        sx={{
          width: "480px",
          boxShadow: "0 0 5px 5px #eee",
          borderRadius: "20px",
          userSelect: "none",
          maxHeight: '890px'
        }}
      >
        <Header title="干员盒">
          <Button variant="outline" radius="xl" onClick={handleFoldStatusChange}>
            {filters.fold ? '展开筛选面板' : '收起筛选面板'}
          </Button>
        </Header>
        <FilterBox />
        <OptListBox />
        <Box sx={{ width: "100%", height: "15px" }}></Box>
      </Box>
      <DraggableTierList />
    </Box >
  );
}
