import { Center, Group, Text } from '@mantine/core';
import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { mapToArray } from 'src/utils/ObjectUtils';
import { useTranslation } from 'react-i18next';
import CharContainer from 'src/components/@arksurvey/CharContainer';
import { updateEditingCharKey } from 'src/store/slice/charBoxSlice';
import { CharacterType, useDataMap, useSetting } from 'src/pages/store';

// char which is in charBox
export default function CharacterList({ filterChar }: { filterChar: (char: CharacterType) => boolean }) {
  const { charMap } = useDataMap();
  const { editingCharKey, charInBox } = useSelector((state: RootState) => state.charBox);
  const dispatch = useDispatch();
  const { setting } = useSetting();
  const { t } = useTranslation();

  const list = useMemo(() => {
    return mapToArray<CharacterType>(charMap)
      .filter((it) => {
        return !it.isNotObtainable && Object.keys(charInBox).filter((i) => i === it.key).length > 0 && filterChar(it);
      })
      .map((character) => (
        <CharContainer
          key={charInBox[character.key].skinUse}
          selecting={editingCharKey === character?.key}
          onSelectChange={() => dispatch(updateEditingCharKey(character?.key))}
          charKey={charInBox[character.key].skinUse ?? ''}
          charName={character?.name ?? ''}
          nameDisplay={setting.nameDisplay}
          mini={setting.mini}
          dragDisabled
        />
      ));
  }, [charInBox, charMap, dispatch, editingCharKey, filterChar, setting.mini, setting.nameDisplay]);

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
