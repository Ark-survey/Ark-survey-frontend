import { Group, Switch, Text, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IconInfoCircle } from '@tabler/icons';
import { useSetting } from 'src/pages/store';

export default function Index() {
  const { t } = useTranslation();
  const { setting, setSettingKeyValue } = useSetting();

  const handleMiniStatusChange = (event: any) => {
    setSettingKeyValue('mini', event.currentTarget.checked);
  };

  return (
    <Switch
      checked={setting.mini}
      onChange={handleMiniStatusChange}
      label={
        <Tooltip label="开启这个选项会让除皮肤以外所有的头像变小" position="bottom" offset={10}>
          <Group position="center" spacing={8}>
            <Text>干员头像 MINI 模式</Text>
            <IconInfoCircle size={12} />
          </Group>
        </Tooltip>
      }
    />
  );
}
