import { SegmentedControl } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function Index() {
  const { t } = useTranslation();

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
