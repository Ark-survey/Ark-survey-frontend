import {
  ActionIcon,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Paper,
  SegmentedControl,
  Space,
  Stack,
  Title,
} from '@mantine/core';
import { useCallback, useMemo } from 'react';
import { Character, Module } from 'src/service/CharBoxServer';
import { IconChevronsDown, IconChevronsUp } from '@tabler/icons';
import UniEquipImg from '../ImageContainer/UniEquipImg';
import { useDataMap } from 'src/pages/store';

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
  data: Character;
  onClickFoldButton?: (value: boolean) => void;
  onSelectUniEquipChange?: (key: string) => void;
  onUniEquipLevelChange?: (level: number, key: string) => void;
}

// 等比缩放
// 使用 flowWidthRef 的时候会忽略 width，跟随指定元素的宽度
export default function Index({
  data,
  fold = false,
  onClickFoldButton,
  onSelectUniEquipChange,
  onUniEquipLevelChange,
}: UniEquipPanelProps) {
  const segmentedControlData = useMemo(
    () => [
      { value: '1', label: '一级' },
      { value: '2', label: '二级' },
      { value: '3', label: '三级' },
    ],
    [],
  );
  const { charMap } = useDataMap();
  const { classes, cx } = useStyles({ fold });
  const equips = useMemo(() => {
    const result: { [key: string]: any } = {};
    Object.keys(charMap[data.key].equips).forEach((it, index) => {
      if (index === 0) {
        result['default'] = { ...charMap[data.key].equips[it] };
        return;
      }
      result[it] = {
        ...charMap[data.key].equips[it],
      };
    });

    return result;
  }, [charMap, data.key]);

  const findCurrentAroundNode = useMemo(() => {
    let frontKey = '';
    let backKey = '';
    const keys = Object.keys(equips).filter((it) => it === 'default' || data?.modules?.[it]?.level > 0);
    if (keys.length > 0) {
      const currentKeyIndex = keys.findIndex((value) => value === data.moduleUse);
      if (currentKeyIndex > 0) {
        frontKey = keys[currentKeyIndex - 1];
      }
      if (currentKeyIndex < keys.length - 1) {
        backKey = keys[currentKeyIndex + 1];
      }
    }
    return { frontKey, backKey };
  }, [data.moduleUse, data.modules, equips]);

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
          transition: 'all 0.5s',
          position: 'absolute',
          width: '100%',
          top: '0px',
        }}
      >
        <Group position="apart" mx={16}>
          <Title order={5}>{data.elite === 2 && equips?.[data.moduleUse]?.name}</Title>
          {Object.keys(equips).length > 0 && data.elite === 2 && (
            <Group>
              {Object.keys(data.modules)
                .filter((it) => !it.includes('001'))
                .map((key) => {
                  if (data.modules[key].level === 0) {
                    return (
                      <ActionIcon size="lg" key={key} onClick={() => onUniEquipLevelChange?.(1, key)}>
                        <UniEquipImg imgKey={data.modules[key].key} width={30} />
                      </ActionIcon>
                    );
                  }
                  return (
                    <ActionIcon
                      size="lg"
                      variant="outline"
                      color="green"
                      key={key}
                      onClick={() => onUniEquipLevelChange?.(0, key)}
                    >
                      <UniEquipImg imgKey={data.modules[key].key} width={30} />
                    </ActionIcon>
                  );
                })}
              <Title order={5}>模组</Title>
            </Group>
          )}
        </Group>
      </Box>
      <Paper withBorder shadow="md" className={classes.container}>
        {Object.keys(equips).length > 0 && data.elite === 2 ? (
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
                <IconChevronsUp />
              </Button>
              <Button
                variant="subtle"
                radius={0}
                disabled={findCurrentAroundNode.backKey === ''}
                sx={{ height: 75, padding: 0 }}
                onClick={() => handleDisplayChange('down')}
              >
                <IconChevronsDown />
              </Button>
            </Stack>
            <Box sx={{ flex: '1', display: 'flex', flexDirection: 'row-reverse' }}>
              {data.moduleUse !== 'default' ? (
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
                      value={data.modules?.[data.moduleUse]?.level.toString()}
                      onChange={(value) => onUniEquipLevelChange?.(parseInt(value, 10), data.moduleUse)}
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
                    <Box sx={{ width: '18px', height: '40px', position: 'absolute', background: '#fff', zIndex: 1 }}>
                      {data.modules?.[data.moduleUse]?.level}
                    </Box>
                  </Center>
                </>
              ) : (
                <Center sx={{ flex: '1', fontWeight: 500, color: '#ccc' }}>NO INFO</Center>
              )}
              <UniEquipImg imgKey={data.moduleUse} width={150} />
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
