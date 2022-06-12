import { Box, createStyles, Overlay } from '@mantine/core';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from 'src/hooks';
import { useClickOutside } from '@mantine/hooks';
import SkillIcon from '../image-container/SkillIcon';

export const ItemTypes = {
  OPERATOR: 'Operator',
};

export type SkillContainerType = 'default' | 'tier-list';

export type SkillContainerStatus = 'default' | 'picked';

interface SkillContainerStyleProps {
  mini?: boolean;
  selecting?: boolean;
  type?: SkillContainerType;
}

const useStyles = createStyles((theme, { mini, type, selecting }: SkillContainerStyleProps) => ({
  avatarBox: {
    userSelect: 'none',
    width: mini ? 30 : 60,
    minWidth: mini ? 30 : 60,
    height: mini ? 30 : 60,
    // flex: type === SkillListItemType.NORMAL ? 'auto' : '',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0px 1px 2px 1px ' + theme.colors.gray[7],
    margin: theme.spacing.xs,
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

export interface SkillDragItem {
  type?: SkillContainerType;
  skillKey?: string;
  fromTierValue?: number;
}

interface SkillContainerProps {
  type?: SkillContainerType;
  skillKey?: string;
  skillName?: string;
  nameDisplay?: boolean;
  readonly?: boolean;
  mini?: boolean;
  selecting?: boolean;
  onSelectChange?: (value: boolean) => void;
  onDelete?: () => void;
  skillStatus?: SkillContainerStatus;
  metaInfo?: {
    fromTierValue?: number;
  };
}

export default function SkillContainer({
  skillKey,
  type = 'default',
  readonly = !skillKey,
  metaInfo,
  skillStatus = 'default',
  skillName,
  nameDisplay,
  mini,
  selecting,
  onDelete,
  onSelectChange,
}: SkillContainerProps) {
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
          {skillStatus === 'picked' && t('picked')}
          {selecting && type === 'tier-list' && t('skillContainer.delete')}
        </Box>
      </Overlay>
    );
  }, [mini, t, skillStatus, selecting, type]);

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
