import { Group, ActionIcon, useMantineColorScheme, Box, Image, Space, Burger, createStyles } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useVersionDialog from './useVersionDialog';
import { useMeta, useSetting } from 'src/pages/store';

const useStyles = createStyles((theme, params, getRef) => ({
  menu: {
    display: 'none',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: 'block',
    },
  },
  logoTitle: {
    display: 'block',
    position: 'relative',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: 'none',
    },
  },
}));

function Logo() {
  const { t } = useTranslation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { dialogContext, setOpened } = useVersionDialog();
  const { version } = useMeta();
  const { classes, cx } = useStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        fontSize: '32px',
        paddingLeft: 5,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      <Image src="/favicon.ico" alt="logo" width="40px" />
      <Space w={10} />
      <Box className={classes.logoTitle}>
        <Box>{t('header.title')}</Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: -5,
            fontSize: '10px',
            textAlign: 'right',
            cursor: 'pointer',
            height: '15px',
            transform: 'scale(0.8)',
          }}
          onClick={() => setOpened((opened) => !opened)}
        >
          {'v' + version}
        </Box>
        {dialogContext}
      </Box>
    </Box>
  );
}

export function Brand() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { setting, setSettingKeyValue } = useSetting();
  const { classes, cx } = useStyles();

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
      })}
    >
      <Group position="apart">
        <Burger
          className={classes.menu}
          opened={setting.menuOpened}
          onClick={() => setSettingKeyValue('menuOpened', !setting.menuOpened)}
        />
        <Logo />
        <Group>
          {/* <ActionIcon variant="default" disabled size={30}>
            <Language size={16} />
          </ActionIcon> */}
          <ActionIcon variant="default" disabled onClick={() => toggleColorScheme()} size={30}>
            {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
}
