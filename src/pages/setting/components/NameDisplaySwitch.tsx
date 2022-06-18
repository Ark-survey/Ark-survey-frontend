import { Group, Switch, Text, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { changeNameDisplay } from 'src/store/slice/settingSlice';
import { IconInfoCircle } from '@tabler/icons';

export default function Index() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const setting = useSelector((state: RootState) => state.setting);

  const handleMiniStatusChange = (event: any) => {
    dispatch(changeNameDisplay(event.currentTarget.checked));
  };

  return (
    <Switch
      checked={setting.nameDisplay}
      onChange={handleMiniStatusChange}
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
