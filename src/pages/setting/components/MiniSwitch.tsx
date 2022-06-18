import { Group, Switch, Text, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { changeMini } from 'src/store/slice/settingSlice';
import { IconInfoCircle } from '@tabler/icons';

export default function Index() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const setting = useSelector((state: RootState) => state.setting);

  const handleMiniStatusChange = (event: any) => {
    dispatch(changeMini(event.currentTarget.checked));
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
