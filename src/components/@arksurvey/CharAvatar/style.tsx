import { createStyles } from '@mantine/core';

export interface CharAvatarStyleProps {
  mini?: boolean;
  selected?: boolean;
  readonly?: boolean;
  themeColor?: string;
}

export const useStyles = createStyles((theme, { mini, selected, readonly, themeColor }: CharAvatarStyleProps) => ({
  avatar: {
    userSelect: 'none',
    width: mini ? 40 : 80,
    minWidth: mini ? 40 : 80,
    height: mini ? 40 : 80,
    // flex: type === CharListItemType.NORMAL ? 'auto' : '',
    borderRadius: mini ? '50%' : '20%',
    overflow: 'hidden',
    position: 'relative',
    cursor: readonly ? 'default' : 'pointer',
    zIndex: 1,
    boxShadow: selected ? 'inset 0px 0px 10px 4px ' + themeColor : 'inset 0px 0px 10px 4px ' + theme.colors.gray[5],
  },
  name: {
    position: 'absolute',
    zIndex: 2,
    top: mini ? '1px' : '66px',
    left: mini ? '-50%' : '0px',
    width: mini ? '200%' : '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '14px',
    textAlign: 'center',
    transform: mini ? 'scale(0.5)' : '',
    fontSize: '10px',
    fontWeight: 700,
    background:
      'linear-gradient(to top, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 90%, rgba(255,249,242,0) 100%)',
  },
  overlay: {
    color: '#fff',
    display: 'flex',
    fontWeight: 600,
    fontSize: mini ? '10px' : '',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
