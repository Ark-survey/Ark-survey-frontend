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
import { useState } from 'react';
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
    fontWeight: 500,
    marginTop: 4,
    fontSize: theme.fontSizes.xs,
    marginBottom: 4,
    height: 19,
  },
}));

interface LevelPanelProps {
  fold?: boolean;
  onClickFoldButton?: (value: boolean) => void;
  position?: [number, number];
}

// 等比缩放
// 使用 flowWidthRef 的时候会忽略 width，跟随指定元素的宽度
export default function Index({ onClickFoldButton, fold = false }: LevelPanelProps) {
  const { classes, cx } = useStyles({ fold });

  const [eliteData] = useState([
    { value: '0', label: '未精英' },
    { value: '1', label: '精一' },
    { value: '2', label: '精二' },
  ]);
  return (
    <Box className={classes.container}>
      <Box className={classes.ringContainer}>
        <RingProgress
          size={110}
          thickness={5}
          label={
            <Box sx={{ position: 'relative' }}>
              <Text sx={{ fontSize: '12px', position: 'absolute', left: '37px', top: -5 }} align="center">
                LV
              </Text>
              <Text sx={{ fontSize: '36px' }} align="center" weight={700}>
                80
              </Text>
            </Box>
          }
          sections={[{ value: (80 / 9) * 10, color: 'yellow' }]}
        />
        <RingProgress
          size={70}
          thickness={4}
          label={
            <Box sx={{ position: 'relative' }}>
              <Text sx={{ fontSize: '12px', position: 'absolute', left: '15px', bottom: -35 }} align="center">
                精英
              </Text>
              <Text size="xl" align="center">
                2
              </Text>
            </Box>
          }
          sections={[{ value: 600 / 6, color: 'green' }]}
        />
        <RingProgress
          size={70}
          thickness={4}
          label={
            <Box sx={{ position: 'relative' }}>
              <Text sx={{ fontSize: '12px', position: 'absolute', left: '15px', bottom: -35 }} align="center">
                潜能
              </Text>
              <Text size="xl" align="center">
                6
              </Text>
            </Box>
          }
          sections={[{ value: 600 / 6, color: 'blue' }]}
        />
        <RingProgress
          size={70}
          thickness={4}
          label={
            <Box sx={{ position: 'relative' }}>
              <Text sx={{ fontSize: '12px', position: 'absolute', left: '15px', bottom: -35 }} align="center">
                信赖
              </Text>
              <Text size="xl" align="center">
                150
              </Text>
            </Box>
          }
          sections={[{ value: 150 / 2, color: 'orange' }]}
        />
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
        数值养成
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
            <SegmentedControl defaultValue="2" size="xs" data={eliteData} />
          </Grid.Col>
          <Grid.Col span={6} className={classes.numberInput}>
            <NumberInput defaultValue={60} label="等级" size="xs" min={1} max={90} />
          </Grid.Col>
          <Grid.Col span={6} className={classes.numberInput}>
            <NumberInput defaultValue={0} label="潜能" size="xs" min={0} max={6} />
          </Grid.Col>
          <Grid.Col span={6} className={classes.numberInput}>
            <NumberInput defaultValue={200} label="信赖" size="xs" min={0} max={200} />
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
}
