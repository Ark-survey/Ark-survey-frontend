import { Title, Center, Text, Box } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeta } from '../store';

export default function Index() {
  const { user } = useMeta();

  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(`/`);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate, user.id]);

  return (
    <Center sx={{ height: '80vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Title>404</Title>
        <Text>即将返回首页</Text>
      </Box>
    </Center>
  );
}
