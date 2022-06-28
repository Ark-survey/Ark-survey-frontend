import { Box, Overlay } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CharAvatar from '../ImageContainer/CharAvatar';
import { useClickOutside } from '@mantine/hooks';
import { CharContainerProps, useStyles } from './DraggableCharContainer';

export default function CharContainer({
  sx,
  charKey,
  type = 'default',
  charStatus = 'default',
  readonly = !charKey || charStatus === 'picked',
  selecting,
  metaInfo,
  skinDisabled,
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
          {skinDisabled && '未持有'}
        </Box>
      </Overlay>
    );
  }, [mini, charStatus, t, selecting, type, skinDisabled]);

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
            sx={{
              cursor: readonly ? '' : 'pointer',
            }}
          >
            {!(selecting || charStatus === 'default') && overlay}
            {selecting && type === 'tier-list' && overlay}
            {skinDisabled && overlay}
            {nameDisplay && name}
            <CharAvatar imgKey={charKey ?? ''} width={mini ? 40 : 80} flowWidthRef={parent.current ?? undefined} />
          </Box>
        ))}
    </Box>
  );
}
