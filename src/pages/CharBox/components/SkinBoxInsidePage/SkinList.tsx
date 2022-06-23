import { Center, Group, Text } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SkinListItem from './SkinListItem';

interface CharacterListProps<T> {
  filterData: T[];
  selectKeys: string[];
  onSelect: (key: string) => void;
  onSelectCancel: (key: string) => void;
}

export default function CharacterList<T extends { key: string }>({
  filterData,
  selectKeys,
  ...props
}: CharacterListProps<T>) {
  const { t } = useTranslation();

  const charListData = useMemo(() => {
    return filterData.map((data, index) => (
      <SkinListItem
        key={data?.key ?? ''}
        data={data}
        selecting={selectKeys.findIndex((it) => it === data?.key) > -1}
        {...props}
      />
    ));
  }, [filterData, props, selectKeys]);

  return (
    <Group spacing={10} position="center">
      {charListData.length > 0 ? (
        charListData
      ) : (
        <Center key="none">
          <Text color="#ccc">{t('no-qualified')}</Text>
        </Center>
      )}
    </Group>
  );
}
