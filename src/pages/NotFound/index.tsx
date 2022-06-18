import { Title, Center, Text, Box } from '@mantine/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';

export default function Index() {
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(`/`);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate, user?.userData?.id]);

  return (
    <Center sx={{ height: '80vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Title>404</Title>
        <Text>即将返回首页</Text>
      </Box>
    </Center>
  );
}
