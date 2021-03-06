import { Group, Sx, Text, UnstyledButton } from '@mantine/core';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavItemProps {
  sx?: Sx;
  selecting?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  to?: string;
  onClick?: () => void;
}

export default function Index({ sx, selecting, leftIcon, title, disabled, children, to, onClick }: NavItemProps) {
  let navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => {
        to && navigate(to);
        onClick?.();
      }}
      disabled={disabled}
      sx={(theme) => ({
        userSelect: 'none',
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: !disabled ? (theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black) : theme.colors.gray[5],
        backgroundColor: selecting
          ? theme.colorScheme === 'dark'
            ? theme.colors.gray[5]
            : theme.colors.gray[1]
          : undefined,
        '&:hover': {
          backgroundColor:
            !selecting && !disabled
              ? theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0]
              : undefined,
          cursor: !disabled ? 'pointer' : 'not-allowed',
        },
        '&:active': {
          backgroundColor:
            !selecting && !disabled
              ? theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[2]
              : undefined,
          cursor: !disabled ? 'pointer' : 'not-allowed',
        },
        ...sx,
      })}
    >
      {children ?? (
        <Group>
          {/* <ThemeIcon variant="light">{leftIcon}</ThemeIcon> */}
          {leftIcon}
          <Text size="md" weight={600}>
            {title}
          </Text>
        </Group>
      )}
    </UnstyledButton>
  );
}
