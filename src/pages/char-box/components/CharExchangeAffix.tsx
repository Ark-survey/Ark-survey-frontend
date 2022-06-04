import { Affix, Box, Paper, Divider, Title, ActionIcon, Stack } from '@mantine/core';
import CharacterList from './CharExchangeBox/CharList';
import { Exchange, Filter } from 'tabler-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCharBoxEditing } from 'src/store/slice/settingSlice';
import { RootState } from 'src/store';

export default function Index({ onClickFilter }: { onClickFilter: () => void }) {
  const { charBoxEditing } = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  return (
    <Affix position={{ bottom: 0, right: 0 }}>
      <Divider />
      <Paper radius={0} p="md" sx={{ width: '100vw', height: '200px', display: 'flex' }}>
        <Stack pr={10}>
          <ActionIcon color="blue" onClick={() => dispatch(updateCharBoxEditing(!charBoxEditing))}>
            <Exchange />
          </ActionIcon>
          <ActionIcon color="blue" onClick={onClickFilter}>
            <Filter />
          </ActionIcon>
          <Title order={5} px={5}>
            干员盒
          </Title>
        </Stack>
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          <CharacterList />
        </Box>
      </Paper>
    </Affix>
  );
}
