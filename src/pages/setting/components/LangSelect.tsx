import { SegmentedControl } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { changeMini } from 'src/store/slice/settingSlice';

export default function Index() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const setting = useSelector((state: RootState) => state.setting);

  const handleMiniStatusChange = (event: any) => {
    dispatch(changeMini(event.currentTarget.checked));
  };

  return (
    <SegmentedControl
      size="xs"
      data={[
        { label: '中文简体', value: 'zh-CN' },
        { label: '中文繁体', value: 'zh-TW', disabled: true },
        { label: 'English', value: 'en', disabled: true },
        { label: 'にほんご', value: 'ja', disabled: true },
        { label: '한국어', value: 'ko', disabled: true },
      ]}
    />
  );
}
