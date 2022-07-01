import { Group } from '@mantine/core';
import { useMemo } from 'react';
import { CharacterType } from 'src/pages/store';
import CharAvatarListItem from './components/CharAvatarListItem';
import { NoQualified } from './components/NoQualified';

interface CharacterListProps {
  charDataList: CharacterType[];
  selectKeys: string[];
  onSelectChange?: (key: string, changeTo: boolean) => void;
}

export default function AvatarList({ charDataList, selectKeys, onSelectChange }: CharacterListProps) {
  const charListData = useMemo(() => {
    return charDataList.map((character) => {
      const selected = !!selectKeys.includes(character.key);
      return (
        <CharAvatarListItem
          key={character.key}
          selected={selected}
          character={character}
          onClick={() => onSelectChange?.(character.key, !selected)}
        />
      );
    });
  }, [charDataList, onSelectChange, selectKeys]);

  return charListData.length > 0 ? (
    <Group spacing={10} position="center">
      {charListData}
    </Group>
  ) : (
    <NoQualified />
  );
}
