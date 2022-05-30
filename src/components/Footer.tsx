import {
  Avatar,
  AvatarsGroup,
  Box,
  Button,
  Text,
  createStyles,
  Group,
  Space,
  Stack,
  Grid,
  Center,
} from '@mantine/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'src/hooks';
import { BrandGithub, Container, Notes, Tent, Trash } from 'tabler-icons-react';

interface HeaderProps {
  children?: any;
}

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    position: 'relative',
    maxWidth: theme.breakpoints.lg,
    padding: theme.spacing.lg,
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
  contributorsBox: {
    flex: '1',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      textAlign: 'center',
      width: '100%',
    },
  },
  avatarTitle: {
    fontSize: '14px',
    width: '100px',
  },
  buttonBox: {
    maxWidth: '250px',
    padding: '0 10px',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      maxWidth: '',
    },
  },
  buttonGrid: {
    width: 100,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: 30,
    },
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: 'auto',
    },
  },
  bigLetter: {
    fontSize: '30px',
    position: 'absolute',
    top: '-10px',
  },
  text: {
    fontSize: theme.fontSizes.xs,
    textAlign: 'center',
  },
}));

const CustomAvatar: FC<{ letter: string; text: string; src: { imgUrl: string; to: string }[] }> = ({
  letter,
  src,
  text,
}) => {
  const { downSM, downXS } = useWindowSize();
  const { classes } = useStyles();
  return (
    <Box
      sx={{
        fontSize: '14px',
        width: '100px',
        position: 'relative',
      }}
    >
      {!downSM ? <Box className={classes.bigLetter}>{letter}</Box> : <Box className={classes.text}>{text}</Box>}
      <AvatarsGroup
        size="md"
        radius="xl"
        limit={2}
        sx={{ marginLeft: downSM ? '' : '12px', padding: downSM ? '0' : '' }}
      >
        {src.map((it, index) => {
          return (
            <Avatar
              key={index}
              src={it.imgUrl}
              sx={{ margin: downSM ? '0 auto' : '' }}
              component={it.to ? 'a' : 'div'}
              href={it.to ?? undefined}
            />
          );
        })}
      </AvatarsGroup>
    </Box>
  );
};

export default function Index({ children }: HeaderProps) {
  const { t } = useTranslation();
  const { downXS, downSM, downMD } = useWindowSize();
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.contributorsBox}>
        <Box sx={{ maxWidth: '550px', minWidth: '340px' }}>
          <Center sx={{ justifyContent: downSM ? undefined : 'left', fontWeight: 600 }}>
            {t('footer.contributors')}
          </Center>
          <Space h={10} />
          <Grid gutter="xs">
            <Grid.Col span={downSM ? 3 : 3}>
              <Center>
                <CustomAvatar
                  letter="M"
                  text={t('footer.maintain')}
                  src={[
                    {
                      imgUrl: 'https://avatars.githubusercontent.com/u/34475327',
                      to: 'https://github.com/HEGGRIA',
                    },
                  ]}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={downSM ? 3 : 3}>
              <Center>
                <CustomAvatar
                  letter="F"
                  text={t('footer.frontend')}
                  src={[
                    {
                      imgUrl: 'https://avatars.githubusercontent.com/u/32563762',
                      to: 'https://github.com/Gliese129',
                    },
                  ]}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={downSM ? 3 : 3}>
              <Center>
                <CustomAvatar
                  letter="B"
                  text={t('footer.backend')}
                  src={[
                    {
                      imgUrl: 'https://avatars.githubusercontent.com/u/84258011',
                      to: 'https://github.com/yamasakura',
                    },
                    {
                      imgUrl: 'https://avatars.githubusercontent.com/u/17798738',
                      to: 'https://github.com/LamForest',
                    },
                  ]}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={downSM ? 3 : 3}>
              <Center>
                <CustomAvatar
                  letter="D"
                  text={t('footer.design')}
                  src={[
                    {
                      imgUrl: 'https://avatars.githubusercontent.com/u/105902873?v=4',
                      to: 'https://github.com/Sheenaghbu',
                    },
                  ]}
                />
              </Center>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
      <Grid gutter="sm" className={classes.buttonBox}>
        <Grid.Col span={downXS ? 3 : 6} className={classes.buttonGrid}>
          <Button
            variant="filled"
            fullWidth
            size="xs"
            color="dark"
            onClick={() => window.open('https://github.com/Ark-survey')}
          >
            {downMD ? <BrandGithub /> : t('footer.gitHub')}
          </Button>
        </Grid.Col>
        <Grid.Col span={downXS ? 3 : 6} className={classes.buttonGrid}>
          <Button
            variant="filled"
            fullWidth
            size="xs"
            color="teal"
            onClick={() => window.open('https://github.com/Ark-survey/Ark-survey-frontend/issues/new')}
          >
            {downMD ? <Notes /> : t('footer.report')}
          </Button>
        </Grid.Col>
        <Grid.Col span={downXS ? 3 : 6} className={classes.buttonGrid}>
          <Button
            variant="filled"
            fullWidth
            size="xs"
            onClick={() => {
              window.open(
                'https://qm.qq.com/cgi-bin/qm/qr?k=rugM8TD2A65C5T0RxWYNpy6JjpcHnjwR&authKey=%2BVKzJroyWHCSU2aFTTyt%2Bhg6GpTL26oMHZn5uVPfPQ2EgNvFpZKt9eY1EqtO%2B7E9&noverify=0&group_code=860266851#',
              );
            }}
          >
            {downMD ? <Tent /> : t('footer.join-us')}
          </Button>
        </Grid.Col>
        <Grid.Col span={downXS ? 3 : 6} className={classes.buttonGrid}>
          <Button
            variant="filled"
            fullWidth
            color="red"
            size="xs"
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            {downMD ? <Trash /> : t('footer.clean-cache')}
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
