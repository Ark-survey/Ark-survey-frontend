import { Box, Sx } from '@mantine/core';
import { ReactNode, RefObject } from 'react';
import ImageSprite from '../ImageSprite';
import CharName from './AvatarName';
import AvatarOverlay from './AvatarOverlay';
import { useStyles } from './style';

export interface CharAvatarProps {
  avatarKey: string;
  nameDisplay?: boolean;
  nameValue?: string;
  overlayDisplay?: boolean;
  overlayText?: string;
  selected?: boolean;
  themeColor?: 'red' | 'green' | 'blue' | 'yellow';
  mini?: boolean;
  readonly?: boolean;
  sx?: Sx;
  parentRef?: any;
  // Width and height is 100%.
  children?: ReactNode;
  onClick?: () => void;
}

/**
 * Use this to display char avatar img and construct avatar list.
 * Note: Because the DND module is too big, we need use it in outside.
 */
export default function CharAvatar({
  avatarKey,
  nameDisplay,
  nameValue,
  overlayDisplay,
  overlayText,
  selected,
  themeColor = 'green',
  mini,
  readonly,
  sx,
  children,
  parentRef,
  onClick,
}: CharAvatarProps) {
  const { classes } = useStyles({ mini, selected, readonly, themeColor });

  return (
    <Box className={classes.avatar} sx={{ ...sx }} onClick={() => readonly && onClick?.()}>
      {children ?? (
        <>
          {nameDisplay && <CharName mini={mini}>{nameValue}</CharName>}
          {overlayDisplay && <AvatarOverlay>{overlayText}</AvatarOverlay>}
          <ImageSprite type="avatar" imgKey={avatarKey} width={mini ? 40 : 80} flowWidthRef={parentRef ?? undefined} />
        </>
      )}
    </Box>
  );
}
