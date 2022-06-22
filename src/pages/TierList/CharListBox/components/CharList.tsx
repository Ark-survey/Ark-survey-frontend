import { Text, Center, Group } from '@mantine/core';
import { useMemo } from 'react';
import CharListItem from './CharListItem';

import { useTranslation } from 'react-i18next';
import useTierList from '../../useTierList';
import { CharacterType } from 'src/pages/store';

interface CharacterListProps {
  filterCharData: CharacterType[];
  selectKeys: string[];
  onSelect: (key: string) => void;
  onSelectCancel: (key: string) => void;
}

export default function CharacterList({ filterCharData, selectKeys, ...props }: CharacterListProps) {
  const { t } = useTranslation();
  const { pickedCharKeys } = useTierList();

  const charListData = useMemo(() => {
    return filterCharData.map((character, index) => (
      <CharListItem
        key={character?.key ?? ''}
        selecting={selectKeys.includes(character?.key)}
        charStatus={pickedCharKeys.includes(character?.key) ? 'picked' : 'default'}
        character={character}
        {...props}
      />
    ));
  }, [filterCharData, pickedCharKeys, props, selectKeys]);

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
