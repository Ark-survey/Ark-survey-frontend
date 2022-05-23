import { Box, Title, Text, Container, Center, Header } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export default function Index() {
  const userTierList = useSelector((state: RootState) => state.userTierList);
  const newTierList = useSelector((state: RootState) => state.user.newTierList);
  return (
    <Center sx={{ height: '80vh' }}>
      <Title>404</Title>
    </Center>
  );
}
