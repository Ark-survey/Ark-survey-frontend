import { Box, Sx } from '@mantine/core';
import { ReactNode, useRef } from 'react';
import ImageSprite from '../ImageSprite';
import CharName from './AvatarName';
import AvatarOverlay from './AvatarOverlay';
import { useStyles } from './style';
import { RemovableAvatar, HasCharAvatar, PickedCharAvatar, DraggableCharAvatar } from './AvatarFactory';

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
  onClick,
}: CharAvatarProps) {
  const { classes } = useStyles({ mini, selected, readonly, themeColor });
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <Box className={classes.avatar} ref={parentRef} sx={{ ...sx }} onClick={() => readonly && onClick?.()}>
      {children ?? (
        <>
          {nameDisplay && <CharName mini={mini}>{nameValue}</CharName>}
          {overlayDisplay && <AvatarOverlay>{overlayText}</AvatarOverlay>}
          <ImageSprite
            type="avatar"
            imgKey={avatarKey}
            width={mini ? 40 : 80}
            flowWidthRef={parentRef.current ?? undefined}
          />
        </>
      )}
    </Box>
  );
}

export { RemovableAvatar, HasCharAvatar, PickedCharAvatar, DraggableCharAvatar };
