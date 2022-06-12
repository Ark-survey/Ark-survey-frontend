import { Box, Stack, Group, List, Space, Text, Title, Tabs, Divider, Sx, BoxProps, ActionIcon } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardRoot from 'src/components/CardRoot';
import NavItem from 'src/components/NavItem';
import PageHeader from 'src/components/PageHeader';
import { RootState } from 'src/store';
import { updateEditKey1, updateEditKey2 } from 'src/store/slice/TierListSlice';
import { treeToArray } from 'src/utils/TreeUtils';
import { ArrowLeft, ChartRadar, Map2 } from 'tabler-icons-react';
import Description from './Description';

export default function Index({ inside, onInside }: { inside: boolean; onInside?: () => void }) {
  const { currentEditKey } = useSelector((state: RootState) => state.tierList);
  const listTypeCollection = useSelector((state: RootState) => state.tierListType.collection);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [activeEnv, setActiveEnv] = useState(0);
  const [type1List] = useState([
    {
      value: 'AE',
      label: '能力',
      icon: <ChartRadar size={16} />,
    },
    {
      value: 'IAE',
      label: '环境',
      icon: <Map2 size={16} />,
    },
  ]);
  const [envList] = useState([
    {
      value: 'LT',
      label: '保全派驻',
    },
    {
      value: 'R',
      label: '集成战略',
    },
    {
      value: 'CC',
      label: '危机合约',
    },
    {
      value: 'M',
      label: '主线',
    },
    {
      value: 'SS',
      label: '支线',
    },
  ]);

  const type2List = useMemo(() => {
    let list = [];
    if (activeTab === 0) {
      list = treeToArray(listTypeCollection[0].children).map((it) => ({
        value: it.id,
        label: it.name,
        road: it.roadId,
        description: it.description,
      }));
    } else {
      list = treeToArray(listTypeCollection[1].children, [1, 2], (node, road, level) => {
        if (level === 0) {
          return node.id;
        } else if (level === 1) {
          return node.id + '# ' + node.name;
        } else {
          return road + ' ' + node.name;
        }
      })
        .map((it) => ({
          value: it.id,
          label: it.road,
          road: it.roadId,
          description: it.description,
        }))
        .filter((it) => it.road?.includes(envList[activeEnv].value));
    }
    return list;
  }, [activeEnv, activeTab, envList, listTypeCollection]);

  const handleType2Change = (value: string) => {
    const typeItem = type2List.find((it) => it.value === value);
    dispatch(updateEditKey1(type1List[activeTab].value));
    dispatch(updateEditKey2({ key: value, road: typeItem?.road ?? '' }));
    onInside?.();
  };
  const fitObj = type2List.find((it) => type1List[activeTab].value + '-' + it?.road === currentEditKey);

  return (
    <>
      <PageHeader title={inside ? fitObj?.label : '强度评价'} inside={inside}>
        <ActionIcon size="md">
          <ArrowLeft onClick={onInside} />
        </ActionIcon>
      </PageHeader>
      {!inside && (
        <>
          <Description />
          <CardRoot>
            <Stack>
              <Tabs active={activeTab} variant="pills" grow onTabChange={setActiveTab}>
                {type1List.map((it) => (
                  <Tabs.Tab key={it.value} tabKey={it.value} label={it.label} icon={it.icon} />
                ))}
              </Tabs>
              {/* <Select sx={{ width: '75px' }} value={tierListType.key1Select} onChange={} data={} /> */}
              <Group noWrap sx={{ alignItems: 'flex-start' }}>
                {activeTab !== 0 && (
                  <>
                    <Group
                      sx={{
                        fontSize: '12px',
                        maxWidth: '78px',
                      }}
                    >
                      {envList.map((it, index) => (
                        <NavItem key={it.value} selecting={activeEnv === index} onClick={() => setActiveEnv(index)}>
                          <Title order={6}>{it.label}</Title>
                        </NavItem>
                      ))}
                    </Group>
                    <Divider orientation="vertical" sx={{ height: '300px' }} />
                  </>
                )}

                <Group>
                  {type2List.map((it) => (
                    <NavItem sx={{ flex: 1 }} key={it.value}>
                      <SelectItem
                        sx={{ height: '100%', minWidth: '220px' }}
                        description={it.description}
                        label={it.label}
                        onClick={() => handleType2Change(it.value)}
                      />
                    </NavItem>
                  ))}
                </Group>
              </Group>
            </Stack>
          </CardRoot>
        </>
      )}
    </>
  );
}

interface ItemProps {
  label?: string;
  description?: string;
  titleProps?: any;
  onClick?: () => void;
  sx?: Sx;
}

const SelectItem = ({ label, description, titleProps, sx, ...others }: ItemProps) => (
  <Box sx={sx} {...others}>
    <Group noWrap sx={{ height: '100%', alignItems: 'flex-start' }}>
      <Box>
        <Title order={5} {...titleProps}>
          {label}
        </Title>
        <Text size="xs" color="dimmed">
          {description && <Divider />}
          {description}
        </Text>
      </Box>
    </Group>
  </Box>
);
