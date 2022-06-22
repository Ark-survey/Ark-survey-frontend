import { Center, Group, Text } from '@mantine/core';
import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { mapToArray } from 'src/utils/ObjectUtils';
import { CharacterType } from 'src/store/slice/userSlice';
import { useTranslation } from 'react-i18next';
import CharContainer from 'src/components/@arksurvey/CharContainer';
import { updateEditingCharKey } from 'src/store/slice/charBoxSlice';

// char which is in charBox
export default function CharacterList({ filterChar }: { filterChar: (char: CharacterType) => boolean }) {
  const { charData } = useSelector((state: RootState) => state.user);
  const { editingCharKey, charInBox } = useSelector((state: RootState) => state.charBox);
  const dispatch = useDispatch();
  const { mini, nameDisplay } = useSelector((state: RootState) => state.setting);
  const { t } = useTranslation();

  const list = useMemo(() => {
    return mapToArray<CharacterType>(charData)
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
          nameDisplay={nameDisplay}
          mini={mini}
          dragDisabled
        />
      ));
  }, [charData, charInBox, dispatch, editingCharKey, filterChar, mini, nameDisplay]);

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
