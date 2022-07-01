import { Center, Group, Text } from '@mantine/core';
import { useMemo } from 'react';

import { mapToArray } from 'src/utils/ObjectUtils';
import { useTranslation } from 'react-i18next';
import CharAvatar from 'src/components/@arksurvey/CharAvatar';
import { CharacterType, useDataMap, useSetting } from 'src/pages/store';
import useCharBox from '../../useCharBox';
import { useEditingCharKey } from '../../store';

// char which is in charBox
export default function CharacterList({ filterChar }: { filterChar: (char: CharacterType) => boolean }) {
  const { charMap } = useDataMap();
  const { setting } = useSetting();
  const { t } = useTranslation();

  const { editingCharKey, updateEditingCharKey } = useEditingCharKey();
  const { charBox } = useCharBox();
  const charInBox = useMemo(() => charBox?.characterKeys ?? {}, [charBox?.characterKeys]);

  const list = useMemo(() => {
    return mapToArray<CharacterType>(charMap)
      .filter((it) => {
        return !it.isNotObtainable && Object.keys(charInBox).filter((i) => i === it.key).length > 0 && filterChar(it);
      })
      .map((character) => (
        <CharAvatar
          key={charInBox[character.key].skinUse}
          selected={editingCharKey === character?.key}
          onClick={() => updateEditingCharKey(character?.key)}
          avatarKey={charInBox[character.key].skinUse ?? ''}
          nameValue={character?.name ?? ''}
          nameDisplay={setting.nameDisplay}
          mini={setting.mini}
        />
      ));
  }, [charInBox, charMap, editingCharKey, filterChar, setting.mini, setting.nameDisplay, updateEditingCharKey]);

  return list.length > 0 ? (
    <Group spacing={10} position="center">
      {list}
    </Group>
  ) : (
    <Center sx={{ height: '100%' }}>
      <Text color="#ccc">{t('no-qualified')}</Text>
    </Center>
  );
}
