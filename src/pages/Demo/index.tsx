import { Box } from '@mantine/core';
import CharDataUnit from 'src/components/@arksurvey/CharDataUnit';
export default function Demo() {
  return (
    <Box p="lg">
      <Box>
        {/* <Title order={5}>这是开发 Demo 页面</Title> */}
        <Box sx={{ display: 'flex', flexFlow: 'wrap' }}>
          <CharDataUnit />
        </Box>
      </Box>
    </Box>
  );
}
