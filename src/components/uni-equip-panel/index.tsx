import { Box, Button, Center, createStyles, Paper, SegmentedControl, Space, Stack } from '@mantine/core';
import { useCallback, useMemo } from 'react';
import { UniEquipDataType } from 'src/components/CharDataUnit';
import { ChevronsDown, ChevronsUp } from 'tabler-icons-react';
import UniEquipImg from '../image-container/UniEquipImg';

const useStyles = createStyles((theme, { fold }: { fold: boolean }) => ({
  container: {
    position: 'relative',
    background: theme.white,
    borderRadius: '10px',
    width: 335,
    display: 'flex',
    marginTop: '40px',
    height: '150px',
    overflow: 'hidden',
  },
}));

interface UniEquipPanelProps {
  fold?: boolean;
  uniEquipData: { [key: string]: UniEquipDataType } | null;
  selectUniEquip: string;
  elite: number;
  onClickFoldButton?: (value: boolean) => void;
  onSelectUniEquipChange?: (key: string) => void;
  onUniEquipLevelChange?: (level: number) => void;
}

// 等比缩放
// 使用 flowWidthRef 的时候会忽略 width，跟随指定元素的宽度
export default function Index({
  uniEquipData,
  fold = false,
  selectUniEquip,
  onClickFoldButton,
  onSelectUniEquipChange,
  onUniEquipLevelChange,
  elite,
}: UniEquipPanelProps) {
  const segmentedControlData = useMemo(
    () => [
      { value: '1', label: '一级' },
      { value: '2', label: '二级' },
      { value: '3', label: '三级' },
    ],
    [],
  );
  const { classes, cx } = useStyles({ fold });

  const findCurrentAroundNode = useMemo(() => {
    let frontKey = '';
    let backKey = '';
    if (uniEquipData) {
      const keys = Object.keys(uniEquipData);
      const currentKeyIndex = keys.findIndex((value) => value === selectUniEquip);
      if (currentKeyIndex > 0) {
        frontKey = keys[currentKeyIndex - 1];
      }
      if (currentKeyIndex < keys.length - 1) {
        backKey = keys[currentKeyIndex + 1];
      }
    }
    return { frontKey, backKey };
  }, [selectUniEquip, uniEquipData]);

  const handleDisplayChange = useCallback(
    (action: 'up' | 'down') => {
      const { frontKey, backKey } = findCurrentAroundNode;
      if (action === 'up' && frontKey) {
        onSelectUniEquipChange?.(frontKey);
        return;
      }
      if (action === 'down' && backKey) {
        onSelectUniEquipChange?.(backKey);
        return;
      }
    },
    [findCurrentAroundNode, onSelectUniEquipChange],
  );

  return (
    <Box sx={{ position: 'relative', width: '335px', userSelect: 'none' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          left: 16,
          fontWeight: 700,
        }}
      >
        {elite === 2 && uniEquipData?.[selectUniEquip].name}
      </Box>
      <Box
        sx={{
          transition: 'all 0.5s',
          position: 'absolute',
          top: 8,
          right: 16,
          fontWeight: 700,
        }}
      >
        模组
      </Box>
      <Paper withBorder shadow="md" className={classes.container}>
        {uniEquipData && elite === 2 ? (
          <>
            {/* <UniEquipImg imgKey="default" width={128} /> */}
            <Stack sx={{ width: '40px' }} spacing={0}>
              <Button
                variant="subtle"
                radius={0}
                disabled={findCurrentAroundNode.frontKey === ''}
                sx={{ height: 75, padding: 0 }}
                onClick={() => handleDisplayChange('up')}
              >
                <ChevronsUp />
              </Button>
              <Button
                variant="subtle"
                radius={0}
                disabled={findCurrentAroundNode.backKey === ''}
                sx={{ height: 75, padding: 0 }}
                onClick={() => handleDisplayChange('down')}
              >
                <ChevronsDown />
              </Button>
            </Stack>
            <Box sx={{ flex: '1', display: 'flex', flexDirection: 'row-reverse' }}>
              {selectUniEquip && selectUniEquip !== 'default' ? (
                <>
                  <Box
                    sx={{
                      transition: 'all 0.5s',
                      height: '100%',
                      boxSizing: 'border-box',
                      padding: fold ? '10px 0' : 10,
                      paddingTop: 20,
                      width: fold ? 0 : 64,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Box sx={{ fontSize: '12px', fontWeight: 700, textAlign: 'center', minWidth: 44 }}>等级</Box>
                    <Space h={5} />
                    <SegmentedControl
                      value={uniEquipData?.[selectUniEquip].level.toString()}
                      onChange={(value) => onUniEquipLevelChange?.(parseInt(value, 10))}
                      data={segmentedControlData}
                      size="xs"
                      orientation="vertical"
                    />
                  </Box>
                  <Center
                    sx={(theme) => ({
                      flex: '1',
                      fontWeight: 700,
                      fontSize: '30px',
                      cursor: 'pointer',
                      color: theme.colors.blue[6],
                    })}
                    onClick={() => onClickFoldButton?.(!fold)}
                  >
                    <Box
                      sx={(theme) => ({
                        border: '5px solid ' + (fold ? theme.colors.blue[6] : '#ccc'),
                        width: '30px',
                        height: '30px',
                        zIndex: 0,
                        position: 'relative',
                      })}
                    >
                      <Box
                        sx={{
                          width: 5,
                          height: 10,
                          position: 'absolute',
                          background: '#fff',
                          zIndex: 1,
                          top: '5px',
                          left: '-5px',
                        }}
                      />
                      <Box
                        sx={{
                          width: 5,
                          height: 10,
                          position: 'absolute',
                          background: '#fff',
                          zIndex: 1,
                          bottom: '5px',
                          right: '-5px',
                        }}
                      />
                    </Box>
                    <Box sx={{ width: '18px', height: '40px', position: 'absolute', background: '#fff', zIndex: 100 }}>
                      {uniEquipData?.[selectUniEquip].level}
                    </Box>
                  </Center>
                </>
              ) : (
                <Center sx={{ flex: '1', fontWeight: 500, color: '#ccc' }}>NO INFO</Center>
              )}
              <UniEquipImg imgKey={selectUniEquip} width={150} />
              <Box sx={{ borderLeft: '1px solid #ccc' }} />
            </Box>
          </>
        ) : (
          <Center sx={{ width: '100%', fontWeight: 500, color: '#ccc' }}>NO INFO</Center>
        )}
      </Paper>
    </Box>
  );
}
