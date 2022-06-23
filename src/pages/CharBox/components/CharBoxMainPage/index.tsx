import { Box, Stack, Group, Text, Title, Divider, Sx, ActionIcon } from '@mantine/core';
import { ReactNode, useState } from 'react';
import CardRoot from 'src/components/CardRoot';
import NavItem from 'src/components/NavItem';
import PageHeader from 'src/components/PageHeader';
import { IconArrowLeft, IconPackage, IconHanger, IconFileImport, IconFileExport } from '@tabler/icons';
import Description from './Description';

const type1List = [
  {
    value: 'char',
    label: '干员 BOX 编辑',
    icon: <IconPackage />,
  },
  {
    value: 'skin',
    label: '皮肤持有编辑',
    icon: <IconHanger />,
  },
];

export default function Index({
  inside,
  onInside,
}: {
  inside: boolean;
  onInside?: (inside: boolean, key?: string) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <PageHeader title={inside ? type1List[activeTab]?.label : '干员数据'} inside={inside}>
        <ActionIcon size="md">
          <IconArrowLeft onClick={() => onInside?.(false)} />
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
                    onClick={() => {
                      setActiveTab(index);
                      onInside?.(true, it.value);
                    }}
                  >
                    <SelectItem
                      label={it.label}
                      topIcon={it.icon}
                      titleProps={{
                        sx: {
                          fontSize: '16px',
                          width: '100%',
                        },
                      }}
                      groupsSx={{ alignItems: 'center', justifyContent: 'center' }}
                    />
                  </NavItem>
                ))}
              </Group>
              <Divider />
              <Group noWrap>
                <NavItem sx={{ textAlign: 'center' }} disabled>
                  <SelectItem
                    label="快速导入数据"
                    topIcon={<IconFileImport />}
                    titleProps={{
                      sx: {
                        fontSize: '16px',
                        width: '100%',
                      },
                    }}
                    groupsSx={{ alignItems: 'center', justifyContent: 'center' }}
                  />
                </NavItem>
                <NavItem sx={{ textAlign: 'center' }} disabled>
                  <SelectItem
                    label="导出数据"
                    topIcon={<IconFileExport />}
                    titleProps={{
                      sx: {
                        fontSize: '16px',
                        width: '100%',
                      },
                    }}
                    groupsSx={{ alignItems: 'center', justifyContent: 'center' }}
                  />
                </NavItem>
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
