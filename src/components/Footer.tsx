import { Avatar, AvatarsGroup, Box, Button, Group, Stack } from '@mantine/core';
import { useWindowSize } from 'src/hooks';
import { BrandGithub, Tent } from 'tabler-icons-react';

interface HeaderProps {
  children?: any;
}

export default function Index({ children }: HeaderProps) {
  const windowSize = useWindowSize();
  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: windowSize.innerWidth < 550 ? '200px' : '150px',
        width: '100vw',
        padding: '0 30px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          fontWeight: 700,
          fontSize: '20px',
          marginTop: '25px',
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Box>Contributors</Box>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                fontSize: '14px',
                width: '100px',
              }}
            >
              Maintain
              <Avatar
                src="https://avatars.githubusercontent.com/u/34475327"
                component="a"
                radius="xl"
                href="https://github.com/HEGGRIA"
              />
            </Box>
            <Box
              sx={{
                fontSize: '14px',
                width: '100px',
              }}
            >
              Frontend
              <Avatar
                src="https://avatars.githubusercontent.com/u/32563762"
                component="a"
                radius="xl"
                href="https://github.com/Gliese129"
              />
            </Box>
            <Box
              sx={{
                fontSize: '14px',
                width: '100px',
              }}
            >
              Backend
              <AvatarsGroup limit={2}>
                <Avatar
                  src="https://portrait.gitee.com/uploads/avatars/user/3225/9676698_yamasakura_1652758812.png"
                  component="a"
                  href="https://gitee.com/yamasakura"
                />
                <Avatar
                  src="	https://avatars.githubusercontent.com/u/17798738"
                  component="a"
                  href="https://github.com/LamForest"
                />
              </AvatarsGroup>
            </Box>
          </Box>
        </Box>
        {windowSize.innerWidth < 550 ? (
          <Box sx={{ marginTop: '20px' }}>
            <Group position="center">
              <Button
                variant="filled"
                color="dark"
                sx={{ width: '150px' }}
                leftIcon={<BrandGithub />}
                onClick={() => window.open('https://github.com/Ark-survey')}
              >
                GitHub
              </Button>
              <Button variant="filled" sx={{ width: '150px' }} leftIcon={<Tent />}>
                加入我们
              </Button>
            </Group>
          </Box>
        ) : (
          <Box sx={{ flex: '1' }}>
            <Stack
              align="flex-end"
              justify="flex-start"
              sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                height: 300,
              })}
            >
              <Button
                variant="filled"
                color="dark"
                sx={{ width: '150px' }}
                leftIcon={<BrandGithub />}
                onClick={() => window.open('https://github.com/Ark-survey')}
              >
                GitHub
              </Button>
              <Button variant="filled" sx={{ width: '150px' }} leftIcon={<Tent />}>
                加入我们
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
}
