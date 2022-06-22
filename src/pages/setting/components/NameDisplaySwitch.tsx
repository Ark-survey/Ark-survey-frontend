import { Group, Switch, Text, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconInfoCircle } from '@tabler/icons';
import { useSetting } from 'src/pages/store';

export default function Index() {
  const { t } = useTranslation();
  const { setting, setSettingKeyValue } = useSetting();

  const handleNameDisplayStatusChange = (event: any) => {
    setSettingKeyValue('nameDisplay', event.currentTarget.checked);
  };

  return (
    <Switch
      checked={setting.nameDisplay}
      onChange={handleNameDisplayStatusChange}
      label={
        <Tooltip label="开启这个选项后，除皮肤以外所有的头像会显示干员名称" position="bottom-end" offset={10}>
          <Group position="center" spacing={8}>
            <Text>干员名称显示</Text>
            <IconInfoCircle size={12} />
          </Group>
        </Tooltip>
      }
    />
  );
}
