import { Center, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const NoQualified = () => {
  const { t } = useTranslation();

  return (
    <Center sx={{ height: '100%' }}>
      <Text color="#ccc">{t('no-qualified')}</Text>
    </Center>
  );
};
