import { ActionIcon, Box, Group, createStyles, Slider, Button } from '@mantine/core';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, useCallback, useMemo, useState } from 'react';
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
    height: fold ? 60 : 240,
    boxShadow: '0px 1px 5px 1px ' + theme.colors.gray[4],
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
    right: 0,
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
    padding: '10px',
    paddingTop: '0',
  },
  detailBarSlider: {
    margin: '35px 10px',
    marginTop: '15px',
    position: 'relative',
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
  skill1: {
    key: string;
    name: string;
    level: number;
  };
  skill2: {
    key: string;
    name: string;
    level: number;
  };
  skill3: {
    key: string;
    name: string;
    level: number;
  };
  skillChoose?: string;
  fold?: boolean;
  onClickFoldButton?: (value: boolean) => void;
  onSelectSkillChange?: (key: string) => void;
  onSkillDetailChange?: (skills: any, index: number) => void;
}

export default function Index({
  skill1,
  skill2,
  skill3,
  skillChoose,
  fold = false,
  onClickFoldButton,
  onSelectSkillChange,
  onSkillDetailChange,
}: SkillGroupProps) {
  const { classes } = useStyles({ fold });
  const [clickKey, setClickKey] = useState('skill_icon_skchr_aglina_1');

  const skills = useMemo(() => [skill1, skill2, skill3], [skill1, skill2, skill3]);

  const handleSliderChange = useCallback(
    (value: number, key: string) => {
      console.log(key);

      let newSkills = skills;
      if ((value / 100) * 9 + 1 >= 7) {
        const changeSkillIndex = skills.findIndex((it: any) => it.key === key);
        onSkillDetailChange?.(
          {
            ...newSkills[changeSkillIndex],
            level: parseInt(((value / 100) * 9 + 1).toFixed(0), 10),
          },
          changeSkillIndex,
        );
      } else {
        newSkills = [];
        skills.forEach((it: any, index) => {
          onSkillDetailChange?.(
            {
              ...it,
              level: parseInt(((value / 100) * 9 + 1).toFixed(0), 10),
            },
            index,
          );
        });
      }
    },
    [onSkillDetailChange, skills],
  );

  return (
    <Box m="xl" sx={{ position: 'relative', width: '355px', userSelect: 'none' }}>
      <Box className={classes.rankBox}>
        <Box
          sx={(theme) => ({
            padding: '10px',
          })}
        >
          {'Rank ' + (skills[0].level > 6 ? 7 : skills[0].level)}
        </Box>
      </Box>
      <Box className={classes.bottomBox}>
        <Box className={classes.folderButton}>
          <Button variant="subtle" sx={{ width: '100%', height: '100%' }} onClick={() => onClickFoldButton?.(!fold)}>
            {fold ? <FoldDown size={30} /> : <FoldUp size={30} />}
          </Button>
        </Box>
        <Box className={classes.detailBar}>
          {skills.map((it, index: number) => {
            const a = skills;
            console.log(a[2].level);
            return (
              <Box key={it.key} className={classes.detailBarSlider} onClick={() => setClickKey(it.key)}>
                <Box className={classes.detailSkillName}>{it.name}</Box>
                <Slider
                  label={null}
                  step={100 / 9}
                  styles={(theme) => ({
                    markLabel: { fontSize: theme.fontSizes.xs, marginBottom: 5, marginTop: 3 },
                  })}
                  value={((it.level - 1) * 100) / 9}
                  onChange={(value) => {
                    console.log(a[2].level);
                    handleSliderChange(value, it.key);
                  }}
                  marks={[
                    { value: 600 / 9, label: '7级' },
                    { value: 700 / 9, label: '专一' },
                    { value: 800 / 9, label: '专二' },
                    { value: 100, label: '专三' },
                  ]}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Group spacing="xs" className={classes.skillIconGroup}>
        {skills.map((it, index: number) => {
          return (
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
            </Box>
          );
        })}
      </Group>
    </Box>
  );
}
