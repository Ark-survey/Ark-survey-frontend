import { Box, createStyles, Overlay, Sx } from '@mantine/core';
import { ReactNode, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from 'src/hooks/useIsMobile';
import CharAvatar from '../ImageContainer/CharAvatar';
import { useClickOutside } from '@mantine/hooks';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

export type CharContainerType = 'default' | 'tier-list';

export type CharContainerStatus = 'default' | 'picked';

export interface CharContainerStyleProps {
  mini?: boolean;
  selecting?: boolean;
  readonly?: boolean;
  type?: CharContainerType;
}

export const useStyles = createStyles((theme, { mini, readonly, type, selecting }: CharContainerStyleProps) => ({
  avatarBox: {
    userSelect: 'none',
    width: mini ? 40 : 80,
    minWidth: mini ? 40 : 80,
    // flex: type === CharListItemType.NORMAL ? 'auto' : '',
    borderRadius: mini ? '50%' : '20%',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
    boxShadow: selecting
      ? 'inset 0px 0px 10px 4px ' + (type !== 'tier-list' ? 'green' : 'red')
      : 'inset 0px 0px 10px 4px ' + theme.colors.gray[5],
  },
  nameBox: {
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
}));

export interface CharDragItem {
  type?: CharContainerType;
  charKey?: string;
  fromTierValue?: number;
}

export interface CharContainerProps {
  sx?: Sx;
  type?: CharContainerType;
  charKey?: string;
  charName?: string;
  hidden?: boolean;
  nameDisplay?: boolean;
  readonly?: boolean;
  mini?: boolean;
  skinDisabled?: boolean;
  selecting?: boolean;
  onSelectChange?: (value: boolean) => void;
  onDelete?: () => void;
  charStatus?: CharContainerStatus;
  metaInfo?: {
    fromTierValue?: number;
  };
  dragDisabled?: boolean;
  children?: ReactNode;
}

export default function DraggableCharContainer({
  sx,
  charKey,
  type = 'default',
  charStatus = 'default',
  readonly = !charKey || charStatus === 'picked',
  selecting,
  dragDisabled = readonly || charStatus !== 'default' || selecting,
  metaInfo,
  charName,
  hidden,
  nameDisplay,
  mini,
  onDelete,
  onSelectChange,
  children,
}: CharContainerProps) {
  const parent = useClickOutside(
    () => type === 'tier-list' && selecting && onSelectChange?.(!selecting),
    ['mouseup', 'touchend'],
  );
  const { classes } = useStyles({ readonly, mini, type, selecting });
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const charDragItem: CharDragItem = { type, charKey, fromTierValue: metaInfo?.fromTierValue };

  const [{ isDragging }, dragger] = useDrag(
    () => ({
      type: ItemTypes.OPERATOR,
      item: charDragItem,
      canDrag: !dragDisabled && !isMobile,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [charDragItem, charStatus, readonly, isMobile, selecting],
  );

  const overlay = useMemo(() => {
    return (
      <Overlay
        opacity={0.6}
        color="#000"
        zIndex={5}
        sx={{
          color: '#fff',
          display: 'flex',
          fontWeight: 600,
          fontSize: mini ? '10px' : '',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          {(isDragging && t('dragging')) || (charStatus === 'picked' && t('picked'))}
          {selecting && type === 'tier-list' && t('charContainer.delete')}
        </Box>
      </Overlay>
    );
  }, [mini, isDragging, t, charStatus, selecting, type]);

  const name = useMemo(() => {
    return <Box className={classes.nameBox}>{charName}</Box>;
  }, [charName, classes.nameBox]);

  const handleClick = () => {
    if (!readonly) {
      if (selecting && type === 'tier-list') {
        onDelete?.();
      } else if (charStatus !== 'picked') {
        onSelectChange?.(!selecting);
      }
    }
  };

  return (
    <Box
      ref={parent}
      className={classes.avatarBox}
      sx={{ ...sx, height: !hidden ? (mini ? 40 : 80) : 0 }}
      onClick={handleClick}
    >
      {children ??
        (!hidden && (
          <Box
            ref={dragger}
            sx={{
              cursor: readonly ? '' : 'pointer',
            }}
          >
            {(!(selecting || charStatus === 'default') || isDragging) && overlay}
            {selecting && type === 'tier-list' && overlay}
            {nameDisplay && name}
            <CharAvatar imgKey={charKey ?? ''} width={mini ? 40 : 80} flowWidthRef={parent.current ?? undefined} />
          </Box>
        ))}
    </Box>
  );
}
