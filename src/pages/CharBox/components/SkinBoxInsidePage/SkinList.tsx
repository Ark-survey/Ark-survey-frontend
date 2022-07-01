import { Center, Group, Text } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CharAvatar from 'src/components/@arksurvey/CharAvatar';

interface CharacterListProps<T extends { [key: string]: any }> {
  filterData: T[];
  keyName: keyof T;
  selectKeys: string[];
  onClick: () => void;
}

export default function CharacterList<T extends { [key: string]: any }>({
  filterData,
  selectKeys,
  keyName,
  onClick,
}: CharacterListProps<T>) {
  const { t } = useTranslation();

  const charListData = useMemo(() => {
    return filterData.map((data) => (
      <CharAvatar
        key={data[keyName]}
        avatarKey={data[keyName]}
        selected={!!selectKeys.find((it) => it === data?.skinKey)}
        onClick={onClick}
      />
    ));
  }, [filterData, keyName, onClick, selectKeys]);

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
