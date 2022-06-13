import { Box, Stack, Group, Text, Title, Divider, Sx, ActionIcon } from '@mantine/core';
import { ReactNode, useState } from 'react';
import CardRoot from 'src/components/CardRoot';
import NavItem from 'src/components/NavItem';
import PageHeader from 'src/components/PageHeader';
import { IconArrowLeft, IconPackage, IconHanger } from '@tabler/icons';
import Description from './Description';

export default function Index({ inside, onInside }: { inside: boolean; onInside?: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const [type1List] = useState([
    {
      value: '0',
      label: '干员 BOX 编辑',
      icon: <IconPackage />,
    },
    {
      value: '1',
      label: '皮肤持有编辑',
      icon: <IconHanger />,
      disabled: true,
    },
  ]);

  return (
    <>
      <PageHeader title={inside ? type1List[activeTab]?.label : '干员数据'} inside={inside}>
        <ActionIcon size="md">
          <IconArrowLeft onClick={onInside} />
        </ActionIcon>
      </PageHeader>
      {!inside && (
        <>
          <Description />
          <CardRoot>
            <Stack>
              <Group noWrap>
                {type1List.map((it, index) => (
                  <NavItem
                    key={index}
                    sx={{ height: '100px' }}
                    disabled={it.disabled}
                    onClick={() => {
                      setActiveTab(index);
                      onInside?.();
                    }}
                  >
                    <SelectItem
                      label={it.label}
                      topIcon={it.icon}
                      titleProps={{
                        sx: {
                          fontSize: '20px',
                          width: '100%',
                        },
                      }}
                      groupsSx={{ alignItems: 'center', justifyContent: 'center' }}
                    />
                  </NavItem>
                ))}
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
  groupsSx?: Sx;
  topIcon?: ReactNode;
  sx?: Sx;
}

const SelectItem = ({ label, description, titleProps, groupsSx, topIcon, sx, ...others }: ItemProps) => (
  <Box sx={sx} {...others}>
    <Stack sx={{ height: '100%', alignItems: 'flex-start', ...groupsSx }}>
      {topIcon}
      <Box>
        <Title order={5} {...titleProps}>
          {label}
        </Title>
        <Text size="xs" color="dimmed">
          {description && <Divider />}
          {description}
        </Text>
      </Box>
    </Stack>
  </Box>
);
