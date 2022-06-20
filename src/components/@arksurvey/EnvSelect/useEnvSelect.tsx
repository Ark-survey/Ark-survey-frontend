import { Stack, Tabs, Group, Title, Divider, TabsValue, Box, Text, Sx, Grid, ScrollArea } from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import NavItem from 'src/components/NavItem';
import { envList, category, tierListTypes } from './data';

export default function useEnvSelect({ onClickEnvButton }: { onClickEnvButton?: (key?: string) => void }) {
  const [currentEditKey, setCurrentEditKey] = useState<string>();
  const [activeTab, setActiveTab] = useState<TabsValue>('AE');
  const [activeEnv, setActiveEnv] = useState<TabsValue>(envList[0].value);

  const categoryTabValue = category.find((it) => it.value === activeTab)?.value ?? '';
  const envTabValue = envList.find((it) => it.value === activeEnv)?.value ?? '';

  const typeList = useMemo(() => {
    return tierListTypes.map((it) => ({
      ...it,
      road:
        it.categoryId === 'AE' || it.categoryId === 'NG'
          ? [it.categoryId, it.id].join('-')
          : [it.categoryId, it.groupId, it.id].join('-'),
      label: it.categoryId === 'AE' || it.categoryId === 'NG' ? it.name : [it.groupId + '#' + it.id, it.name].join(' '),
    }));
  }, []);

  const fitObj = typeList.find((it) => it?.road === currentEditKey);

  const handleTypeClick = useCallback(
    (value?: string) => {
      setCurrentEditKey(value);
      onClickEnvButton?.(value);
    },
    [onClickEnvButton],
  );

  const EnvSelectContent = useMemo(
    () => (
      <Stack>
        <Tabs value={activeTab} variant="pills" onTabChange={setActiveTab}>
          <Tabs.List grow>
            {category.map((it) => (
              <Tabs.Tab key={it.value} value={it.value} icon={it.icon}>
                {it.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panel value="AE" pt="md">
            <ScrollArea>
              <Group sx={{ maxHeight: '500px' }}>
                {typeList
                  .filter((type) => type.categoryId === categoryTabValue)
                  .map((it) => (
                    <NavItem sx={{ flex: 1 }} key={it.road} onClick={() => handleTypeClick(it.road)}>
                      <SelectItem
                        sx={{ height: '100%', minWidth: '195px' }}
                        description={it.description}
                        label={it.label}
                      />
                    </NavItem>
                  ))}
              </Group>
            </ScrollArea>
          </Tabs.Panel>
          <Tabs.Panel value="NG" pt="md">
            <ScrollArea>
              <Group sx={{ maxHeight: '500px' }}>
                {typeList
                  .filter((type) => type.categoryId === categoryTabValue)
                  .map((it) => (
                    <NavItem sx={{ flex: 1 }} key={it.road} onClick={() => handleTypeClick(it.road)}>
                      <SelectItem
                        sx={{ height: '100%', minWidth: '195px' }}
                        description={it.description}
                        label={it.label}
                      />
                    </NavItem>
                  ))}
              </Group>
            </ScrollArea>
          </Tabs.Panel>
          <Tabs.Panel value="IAE" pt="md">
            <Tabs orientation="vertical" value={activeEnv} variant="pills" onTabChange={setActiveEnv}>
              <Group sx={{ alignItems: 'flex-start', width: '100%' }}>
                <Tabs.List grow>
                  {envList.map((it) => (
                    <Tabs.Tab key={it.value} value={it.value}>
                      {it.label}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
                <Divider orientation="vertical" sx={{ height: '100%' }} />
                {envList.map((env) => (
                  <Tabs.Panel key={env.value} value={env.value} sx={{ flex: 1 }}>
                    <ScrollArea>
                      <Group sx={{ alignItems: 'flex-start', width: '100%', maxHeight: '500px' }}>
                        {typeList
                          .filter((type) => type.categoryId === categoryTabValue && type.groupId === envTabValue)
                          .map((it) => (
                            <NavItem sx={{ flex: 1 }} key={it.road} onClick={() => handleTypeClick(it.road)}>
                              <SelectItem
                                sx={{ height: '100%', minWidth: '130px' }}
                                description={it.description}
                                label={it.label}
                              />
                            </NavItem>
                          ))}
                      </Group>
                    </ScrollArea>
                  </Tabs.Panel>
                ))}
              </Group>
            </Tabs>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    ),
    [activeEnv, activeTab, categoryTabValue, envTabValue, handleTypeClick, typeList],
  );

  return { envLabel: fitObj?.label, EnvSelectContent };
}

interface ItemProps {
  label?: string;
  description?: string;
  titleProps?: any;
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
