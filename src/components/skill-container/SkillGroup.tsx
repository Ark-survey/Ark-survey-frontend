import { Box, Group, createStyles, Button, SegmentedControl, Divider, Paper } from '@mantine/core';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Check, FoldDown, FoldUp } from 'tabler-icons-react';
import SkillContainer from '.';

const useStyles = createStyles((theme, { fold }: { fold: boolean }) => ({
  rankBox: {
    height: 40,
    width: '75px',
    background: theme.white,
    fontWeight: 700,
    position: 'relative',
    zIndex: 100,
    border: '1px solid' + theme.colors.gray[2],
    borderRadius: '10px 10px 0 0',
  },
  bottomBox: {
    transition: 'all 0.5s',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: fold ? 60 : 290,
    borderRadius: '0 10px 10px 10px',
    zIndex: 200,
  },
  folderButton: {
    transition: 'all 0.5s',
    display: 'flex',
    flexWrap: 'wrap',
    width: '70px',
    height: fold ? 50 : 70,
    overflow: 'hidden',
    padding: '5px',
  },
  skillName: {
    transition: 'all 0.5s',
    opacity: fold ? 1 : 0,
    display: fold ? '' : 'none',
    flex: 1,
    textAlign: 'center',
    fontSize: theme.fontSizes.xs,
    height: '20px',
    position: 'absolute',
    bottom: '-19px',
    width: '90px',
    left: '-5px',
  },
  skillIconGroup: {
    transition: 'all 0.5s',
    position: 'absolute',
    top: fold ? 0 : 42,
    left: 85,
    marginRight: '10px',
    zIndex: 300,
    fontWeight: 700,
  },
  skillELevel: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#fff',
    position: 'absolute',
  },
  detailBar: {
    padding: '14px',
    paddingTop: '0',
  },
  detailBarSlider: {
    padding: '5px 0',
    margin: '25px 6px',
    textAlign: 'right',
    marginBottom: '0',
    position: 'relative',
  },
  detailBarSliderNoInfo: {
    height: 30.5,
    color: '#ccc',
    textAlign: 'right',
  },
  detailSkillName: {
    transition: 'all 0.5s',
    opacity: fold ? 0 : 1,
    position: 'absolute',
    top: -16,
    right: 0,
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface SkillGroupProps {
  skills: {
    [key: string]: {
      key: string;
      name: string;
      level: number;
    };
  };
  elite: number;
  skillChoose?: string;
  fold?: boolean;
  onClickFoldButton?: (value: boolean) => void;
  onSelectSkillChange?: (key: string) => void;
  onSkillLevelChange?: (v: string, skills: any) => void;
}

export default function Index({
  skills,
  elite,
  skillChoose,
  fold = false,
  onClickFoldButton,
  onSelectSkillChange,
  onSkillLevelChange,
}: SkillGroupProps) {
  const { classes, cx } = useStyles({ fold });

  const data = useMemo(() => {
    const result = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
    ];
    if (elite) {
      if (elite > 0) {
        result.push({ label: '5', value: '5' }, { label: '6', value: '6' }, { label: '7', value: '7' });
      }
      if (elite > 1) {
        result.push({ label: '专精一', value: '8' }, { label: '专精二', value: '9' }, { label: '专精三', value: '10' });
      }
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elite]);

  const skillChooseGroup = useMemo(() => {
    const node: ReactNode[] = [];
    Object.keys(skills).forEach((key, index) => {
      if (index <= elite) {
        node.push(
          <Box key={skills[key].key} className={classes.detailBarSlider}>
            <Box className={classes.detailSkillName}>{skills[key].name}</Box>

            <SegmentedControl
              value={skills[key].level.toString()}
              onChange={(v) => onSkillLevelChange?.(v, key)}
              size="xs"
              sx={{ height: 22.5 }}
              data={data}
            />
          </Box>,
        );
      }
    });
    new Array(3 - node.length).fill(0).forEach((v, index) => {
      node.push(
        <Box key={index} className={cx(classes.detailBarSlider, classes.detailBarSliderNoInfo)}>
          NO INFO
        </Box>,
      );
    });
    return node;
  }, [classes, cx, data, elite, onSkillLevelChange, skills]);

  const skillIconGroup = useMemo(() => {
    const node: ReactNode[] = [];
    Object.keys(skills).forEach((key, index) => {
      if (index <= elite) {
        const it = skills[key];
        node.push(
          <Box
            key={it.key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexFlow: 'wrap',
              maxWidth: '80px',
              position: 'relative',
              userSelect: 'none',
              cursor: 'pointer',
            }}
            onClick={() => onSelectSkillChange?.(it.key)}
          >
            {it.level >= 7 && (
              <Box
                sx={{
                  position: 'absolute',
                  fontSize: '12px',
                  textAlign: 'center',
                  color: '#fff',
                  left: '5px',
                  top: '5px',
                  width: '16px',
                  height: '16px',
                  zIndex: 400,
                  background: 'rgba(0,0,0,0.8)',
                }}
              >
                <Box
                  className={classes.skillELevel}
                  sx={{ top: 2, left: 5, background: it.level > 7 ? '#fff' : '#777' }}
                />
                <Box
                  className={classes.skillELevel}
                  sx={{ bottom: 2, left: 8.5, background: it.level > 9 ? '#fff' : '#777' }}
                />
                <Box
                  className={classes.skillELevel}
                  sx={{ bottom: 2, left: 1.5, background: it.level > 8 ? '#fff' : '#777' }}
                />
              </Box>
            )}
            {skillChoose === it.key && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    fontSize: '12px',
                    textAlign: 'center',
                    color: '#fff',
                    right: '5px',
                    top: '5px',
                    width: 0,
                    height: 0,
                    zIndex: 300,
                    border: '14px solid transparent',
                    borderTop: '14px solid rgba(14,140,226,0.9)',
                    borderRight: '14px solid rgba(14,140,226,0.9)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    color: '#fff',
                    right: '2px',
                    top: '2px',
                    zIndex: 300,
                    transform: 'scale(0.65)',
                  }}
                >
                  <Check />
                </Box>
              </>
            )}
            <SkillContainer skillKey={it.key} />
            <Box
              className={classes.skillName}
              sx={{
                transform:
                  'scale( ' +
                  (it.name.length < 5 ? 1.1 : it.name.length < 6 ? 1 : it.name.length < 8 ? 0.9 : 0.8) +
                  ')',
              }}
            >
              {it.name}
            </Box>
          </Box>,
        );
      }
    });
    new Array(3 - node.length).fill(0).forEach((v, index) => {
      node.push(
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'wrap',
            maxWidth: '80px',
            position: 'relative',
            userSelect: 'none',
            fontSize: '40px',
            textAlign: 'center',
            fontWeight: 100,
            color: '#ccc',
          }}
        >
          <Box
            sx={{
              border: '1px solid #ccc',
              margin: '9px',
              lineHeight: '60px',
              width: '60px',
              height: '60px',
            }}
          >
            /
          </Box>
        </Box>,
      );
    });
    return node;
  }, [classes, onSelectSkillChange, skillChoose, elite, skills]);

  return (
    <Box sx={{ position: 'relative', width: '335px', userSelect: 'none' }}>
      <Box className={classes.rankBox}>
        <Box
          sx={(theme) => ({
            padding: '10px',
          })}
        >
          {'Rank ' + (skills?.[skillChoose ?? '']?.level > 6 ? 7 : skills?.[skillChoose ?? '']?.level ?? 1)}
        </Box>
      </Box>
      <Box
        sx={{
          transition: 'all 0.5s',
          position: 'absolute',
          top: 9,
          right: 16,
          fontWeight: 700,
          opacity: fold ? 0 : 1,
        }}
      >
        技能
      </Box>
      <Paper withBorder shadow="md" className={classes.bottomBox}>
        <Box className={classes.folderButton}>
          <Button variant="subtle" sx={{ width: '100%', height: '100%' }} onClick={() => onClickFoldButton?.(!fold)}>
            {fold ? <FoldDown size={30} /> : <FoldUp size={30} />}
          </Button>
        </Box>
        <Divider />
        <Box className={classes.detailBar}>{skillChooseGroup}</Box>
      </Paper>
      <Group spacing={0} className={classes.skillIconGroup}>
        {skillIconGroup}
      </Group>
    </Box>
  );
}
