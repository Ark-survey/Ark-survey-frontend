import { Box, Center, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import CharAvatar from 'src/components/@arksurvey/CharAvatar';
import CharDataUnit from 'src/components/@arksurvey/CharDataUnit';
export default function Demo() {
  return (
    <Box p="lg">
      {/* <Title order={5}>这是开发 Demo 页面</Title> */}
      <Group>
        <CharAvatar avatarKey="char_002_amiya" />
        <CharAvatar avatarKey="char_002_amiya" selected readonly />
        <CharAvatar avatarKey="char_002_amiya" readonly overlayDisplay overlayText="已禁用" />
        <CharAvatar avatarKey="char_002_amiya" readonly overlayDisplay overlayText="已选择" />
        <CharAvatar avatarKey="char_002_amiya" readonly overlayDisplay overlayText="已持有" />
        <CharAvatar avatarKey="char_002_amiya" readonly overlayDisplay overlayText="拖拽中" />
        <CharAvatar avatarKey="char_002_amiya" selected themeColor="red" overlayDisplay overlayText="删除" />
        <CharAvatar avatarKey="char_002_amiya" selected overlayDisplay overlayText="删除">
          <Center sx={{ height: '100%' }}>
            <IconPlus />
          </Center>
        </CharAvatar>
      </Group>
    </Box>
  );
}
