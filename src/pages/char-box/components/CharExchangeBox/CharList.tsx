import { Center, Group, Text } from '@mantine/core';
import { useMemo } from 'react';
import CharListItem from './CharListItem';
import { CharacterType } from 'src/store/slice/userSlice';
import { useTranslation } from 'react-i18next';

interface CharacterListProps {
  filterCharData: CharacterType[];
  selectKeys: string[];
  onSelect: (key: string) => void;
  onSelectCancel: (key: string) => void;
}

export default function CharacterList({ filterCharData, selectKeys, ...props }: CharacterListProps) {
  const { t } = useTranslation();

  const charListData = useMemo(() => {
    return filterCharData.map((character, index) => (
      <CharListItem
        key={character?.key ?? ''}
        selecting={selectKeys.findIndex((it) => it === character?.key) > -1}
        character={character}
        {...props}
      />
    ));
  }, [filterCharData, props, selectKeys]);

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
