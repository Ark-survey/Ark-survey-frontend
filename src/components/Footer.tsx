import { Avatar, AvatarsGroup, Box, Button, Group, Space, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'src/hooks';
import { BrandGithub, Tent, Trash } from 'tabler-icons-react';

interface HeaderProps {
  children?: any;
}

export default function Index({ children }: HeaderProps) {
  const windowSize = useWindowSize();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: windowSize.innerWidth < 550 ? '200px' : '140px',
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
        <Box sx={{ textAlign: windowSize.innerWidth < 550 ? 'center' : undefined }}>
          <Box>{t('footer.contributors')}</Box>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                fontSize: '14px',
                width: '100px',
              }}
            >
              {t('footer.maintain')}
              <Avatar
                src="https://avatars.githubusercontent.com/u/34475327"
                component="a"
                radius="xl"
                sx={{ margin: windowSize.innerWidth < 550 ? '0 auto' : '' }}
                href="https://github.com/HEGGRIA"
              />
            </Box>
            <Box
              sx={{
                fontSize: '14px',
                width: '100px',
              }}
            >
              {t('footer.frontend')}
              <Avatar
                src="https://avatars.githubusercontent.com/u/32563762"
                component="a"
                radius="xl"
                sx={{ margin: windowSize.innerWidth < 550 ? '0 auto' : '' }}
                href="https://github.com/Gliese129"
              />
            </Box>
            <Box
              sx={{
                fontSize: '14px',
                width: '100px',
              }}
            >
              {t('footer.backend')}
              <AvatarsGroup limit={2} sx={{ justifyContent: windowSize.innerWidth < 550 ? 'center' : '' }}>
                <Avatar
                  src="https://portrait.gitee.com/uploads/avatars/user/3225/9676698_yamasakura_1652758812.png!avatar200"
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
              <Button variant="filled" color="dark" onClick={() => window.open('https://github.com/Ark-survey')}>
                <BrandGithub />
              </Button>
              <Button
                variant="filled"
                onClick={() => {
                  window.open(
                    'https://qm.qq.com/cgi-bin/qm/qr?k=rugM8TD2A65C5T0RxWYNpy6JjpcHnjwR&authKey=%2BVKzJroyWHCSU2aFTTyt%2Bhg6GpTL26oMHZn5uVPfPQ2EgNvFpZKt9eY1EqtO%2B7E9&noverify=0&group_code=860266851#',
                  );
                }}
              >
                <Tent />
              </Button>
              <Button
                variant="filled"
                color="red"
                onClick={() => {
                  localStorage.clear();
                  location.reload();
                }}
              >
                <Trash />
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
                sx={{ width: '200px' }}
                leftIcon={<BrandGithub />}
                onClick={() => window.open('https://github.com/Ark-survey')}
              >
                {t('footer.gitHub')}
              </Button>
              <Box sx={{ display: 'flex' }}>
                <Button
                  variant="filled"
                  onClick={() => {
                    window.open(
                      'https://qm.qq.com/cgi-bin/qm/qr?k=rugM8TD2A65C5T0RxWYNpy6JjpcHnjwR&authKey=%2BVKzJroyWHCSU2aFTTyt%2Bhg6GpTL26oMHZn5uVPfPQ2EgNvFpZKt9eY1EqtO%2B7E9&noverify=0&group_code=860266851#',
                    );
                  }}
                >
                  {t('footer.join-us')}
                </Button>
                <Space w="sm" />
                <Button
                  variant="filled"
                  color="red"
                  onClick={() => {
                    localStorage.clear();
                    location.reload();
                  }}
                >
                  {t('footer.clean-cache')}
                </Button>
              </Box>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
}
