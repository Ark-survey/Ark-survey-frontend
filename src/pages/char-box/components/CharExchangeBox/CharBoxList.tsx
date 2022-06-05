import { Center, Group, Text } from '@mantine/core';
import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { mapToArray } from 'src/utils/ObjectUtils';
import { CharacterType } from 'src/store/slice/userSlice';
import { useTranslation } from 'react-i18next';
import CharContainer from 'src/components/char-container';
import { updateEditingCharKey } from 'src/store/slice/charBoxSlice';

// char which is in charBox
export default function CharacterList() {
  const { charData } = useSelector((state: RootState) => state.user);
  const { editingCharKey, charInBox } = useSelector((state: RootState) => state.charBox);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const list = useMemo(() => {
    return mapToArray<CharacterType>(charData)
      .filter((it) => {
        return !it.isNotObtainable && Object.keys(charInBox).filter((i) => i === it.key).length > 0;
      })
      .map((character) => (
        <CharContainer
          key={character?.key}
          selecting={editingCharKey === character?.key}
          onSelectChange={() => dispatch(updateEditingCharKey(character?.key))}
          charKey={character?.key ?? ''}
          charName={character?.name ?? ''}
          nameDisplay
          mini
          dragDisabled
        />
      ));
  }, [charData, charInBox, dispatch, editingCharKey]);

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
