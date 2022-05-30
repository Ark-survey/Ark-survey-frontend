import { Box, createStyles, Overlay } from '@mantine/core';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from 'src/hooks';
import CharAvatar from '../image-container/CharAvatar';
import { useClickOutside } from '@mantine/hooks';
import SkillIcon from '../image-container/SkillIcon';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

export type CharContainerType = 'default' | 'tier-list';

export type CharContainerStatus = 'default' | 'picked';

interface CharContainerStyleProps {
  mini?: boolean;
  selecting?: boolean;
  type?: CharContainerType;
}

const useStyles = createStyles((theme, { mini, type, selecting }: CharContainerStyleProps) => ({
  avatarBox: {
    userSelect: 'none',
    width: mini ? 30 : 60,
    minWidth: mini ? 30 : 60,
    height: mini ? 30 : 60,
    // flex: type === CharListItemType.NORMAL ? 'auto' : '',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 100,
    boxShadow: '0px 1px 2px 1px ' + theme.colors.gray[7],
    margin: theme.spacing.xs,
  },
  nameBox: {
    position: 'absolute',
    zIndex: 200,
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
  skillKey?: string;
  fromTierValue?: number;
}

interface CharContainerProps {
  type?: CharContainerType;
  skillKey?: string;
  charName?: string;
  nameDisplay?: boolean;
  readonly?: boolean;
  mini?: boolean;
  selecting?: boolean;
  onSelectChange?: (value: boolean) => void;
  onDelete?: () => void;
  charStatus?: CharContainerStatus;
  metaInfo?: {
    fromTierValue?: number;
  };
}

export default function CharContainer({
  skillKey,
  type = 'default',
  readonly = !skillKey,
  metaInfo,
  charStatus = 'default',
  charName,
  nameDisplay,
  mini,
  selecting,
  onDelete,
  onSelectChange,
}: CharContainerProps) {
  const parent = useClickOutside(() => selecting && onSelectChange?.(!selecting), ['mouseup', 'touchend']);
  const { classes } = useStyles({ mini, type, selecting });
  const { t } = useTranslation();
  const isMobile = useIsMobile();

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
          {charStatus === 'picked' && t('picked')}
          {selecting && type === 'tier-list' && t('charContainer.delete')}
        </Box>
      </Overlay>
    );
  }, [mini, t, charStatus, selecting, type]);

  const handleClick = () => {
    if (selecting && type === 'tier-list') {
      onDelete?.();
    } else {
      onSelectChange?.(!selecting);
    }
  };

  return (
    <Box ref={parent} className={classes.avatarBox} onClick={handleClick}>
      <Box>
        <SkillIcon imgKey={skillKey ?? ''} width={mini ? 30 : 60} flowWidthRef={parent.current ?? undefined} />
      </Box>
    </Box>
  );
}