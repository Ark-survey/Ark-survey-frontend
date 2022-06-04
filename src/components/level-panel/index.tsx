import {
  Box,
  Button,
  createStyles,
  Divider,
  Grid,
  NumberInput,
  RingProgress,
  SegmentedControl,
  Text,
} from '@mantine/core';
import { useMemo, useState } from 'react';
import { CharLevelDataType } from 'src/components/CharDataUnit';
import { FoldDown, FoldUp } from 'tabler-icons-react';

const useStyles = createStyles((theme, { fold }: { fold: boolean }) => ({
  container: {
    position: 'relative',
    background: theme.white,
    boxShadow: '0px 1px 5px 1px ' + theme.colors.gray[4],
    borderRadius: '10px',
    width: 335,
  },
  ringContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 7,
    boxSizing: 'border-box',
    userSelect: 'none',
    paddingTop: '16px',
  },
  bottomBox: {
    transition: 'all 0.5s',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: fold ? 40 : 195,
    zIndex: 200,
  },
  folderButton: {
    transition: 'all 0.5s',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: 40,
    overflow: 'hidden',
    padding: '5px',
    boxSizing: 'border-box',
  },
  detailBarSlider: {
    height: '100%',
  },
  numberInput: {},
  detailName: {
    fontWeight: 700,
    marginTop: 4,
    fontSize: theme.fontSizes.xs,
    marginBottom: 4,
    height: 19,
  },
}));

interface LevelPanelProps {
  charLevelData: CharLevelDataType;
  onCharLevelDataChange?: (charLevelData: CharLevelDataType) => void;
  verifyRule: { [key: string]: [number, number] };
  maxEliteVerifyRule: number[];
  maxLevelVerifyRule: number[][];
  fold?: boolean;
  onClickFoldButton?: (value: boolean) => void;
  position?: [number, number];
}

// 等比缩放
// 使用 flowWidthRef 的时候会忽略 width，跟随指定元素的宽度
export default function Index({
  onClickFoldButton,
  charLevelData,
  verifyRule,
  maxEliteVerifyRule,
  maxLevelVerifyRule,
  fold = false,
  onCharLevelDataChange,
}: LevelPanelProps) {
  const { classes, cx } = useStyles({ fold });

  const eliteData = useMemo(() => {
    const result = [
      { value: '0', label: '未精英' },
      { value: '1', label: '精一' },
      { value: '2', label: '精二' },
    ];
    return result.filter((it, index) => index <= maxEliteVerifyRule[charLevelData.rarity]);
  }, [charLevelData.rarity, maxEliteVerifyRule]);

  return (
    <Box className={classes.container}>
      <Box className={classes.ringContainer}>
        <RingProgress
          size={110}
          thickness={5}
          label={
            <Box sx={{ position: 'relative' }}>
              <Text
                sx={{ fontSize: '12px', position: 'absolute', left: '37px', top: -5, fontWeight: 700 }}
                align="center"
              >
                LV
              </Text>
              <Text sx={{ fontSize: '36px' }} align="center" weight={700}>
                {charLevelData?.level ?? 1}
              </Text>
            </Box>
          }
          sections={[
            {
              value:
                ((charLevelData?.level ?? 1) * 100) / maxLevelVerifyRule[charLevelData.elite][charLevelData.rarity],
              color: 'yellow',
            },
          ]}
        />
        <RingProgress
          size={70}
          thickness={4}
          label={
            <Box sx={{ position: 'relative' }}>
              <Text
                sx={{ fontSize: '12px', position: 'absolute', left: '15px', bottom: -35, fontWeight: 700 }}
                align="center"
              >
                精英
              </Text>
              <Text size="xl" align="center">
                {charLevelData?.elite ?? 0}
              </Text>
            </Box>
          }
          sections={[
            { value: ((charLevelData?.elite ?? 0) * 100) / maxEliteVerifyRule[charLevelData.rarity], color: 'green' },
          ]}
        />
        <RingProgress
          size={70}
          thickness={4}
          label={
            <Box sx={{ position: 'relative' }}>
              <Text
                sx={{ fontSize: '12px', position: 'absolute', left: '15px', bottom: -35, fontWeight: 700 }}
                align="center"
              >
                潜能
              </Text>
              <Text size="xl" align="center">
                {charLevelData?.potentialLevel ?? 0}
              </Text>
            </Box>
          }
          sections={[
            { value: ((charLevelData?.potentialLevel ?? 0) * 100) / verifyRule['potentialLevel'][1], color: 'blue' },
          ]}
        />
        <RingProgress
          size={70}
          thickness={4}
          label={
            <Box sx={{ position: 'relative' }}>
              <Text
                sx={{ fontSize: '12px', position: 'absolute', left: '15px', bottom: -35, fontWeight: 700 }}
                align="center"
              >
                信赖
              </Text>
              <Text size="xl" align="center">
                {charLevelData?.trust ?? 0}
              </Text>
            </Box>
          }
          sections={[{ value: ((charLevelData?.trust ?? 0) * 100) / verifyRule['trust'][1], color: 'orange' }]}
        />
      </Box>
      <Box
        sx={{
          transition: 'all 0.5s',
          position: 'absolute',
          top: 9,
          right: 16,
          fontWeight: 700,
        }}
      >
        数值
      </Box>
      <Box className={classes.bottomBox}>
        <Box className={classes.folderButton}>
          <Button variant="subtle" sx={{ width: '100%', height: '100%' }} onClick={() => onClickFoldButton?.(!fold)}>
            {fold ? <FoldDown size={30} /> : <FoldUp size={30} />}
          </Button>
        </Box>
        <Divider />
        <Grid gutter="sm" sx={{ margin: '5px 10px' }}>
          <Grid.Col span={6} className={classes.detailBarSlider}>
            <Box className={classes.detailName}>精英阶段</Box>
            <SegmentedControl
              value={charLevelData.elite.toString()}
              onChange={(value) => onCharLevelDataChange?.({ ...charLevelData, elite: parseInt(value ?? '0', 10) })}
              size="xs"
              data={eliteData}
            />
          </Grid.Col>
          <Grid.Col span={6} className={classes.numberInput}>
            <NumberInput
              value={charLevelData?.level ?? 1}
              onChange={(value) => onCharLevelDataChange?.({ ...charLevelData, level: value ?? 1 })}
              label="等级"
              labelProps={{
                style: { fontWeight: 700 },
              }}
              size="xs"
              min={1}
              max={maxLevelVerifyRule[charLevelData.elite][charLevelData.rarity]}
            />
          </Grid.Col>
          <Grid.Col span={6} className={classes.numberInput}>
            <NumberInput
              value={charLevelData?.potentialLevel ?? 0}
              onChange={(value) => onCharLevelDataChange?.({ ...charLevelData, potentialLevel: value ?? 0 })}
              label="潜能"
              labelProps={{
                style: { fontWeight: 700 },
              }}
              size="xs"
              min={verifyRule['potentialLevel'][0]}
              max={verifyRule['potentialLevel'][1]}
            />
          </Grid.Col>
          <Grid.Col span={6} className={classes.numberInput}>
            <NumberInput
              value={charLevelData?.trust ?? 0}
              onChange={(value) => onCharLevelDataChange?.({ ...charLevelData, trust: value ?? 0 })}
              label="信赖"
              labelProps={{
                style: { fontWeight: 700 },
              }}
              size="xs"
              min={verifyRule['trust'][0]}
              max={verifyRule['trust'][1]}
            />
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}
