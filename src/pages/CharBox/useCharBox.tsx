import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMeta } from '../store';
import { Character, CharBox, CharBoxServer } from 'src/service/CharBoxServer';
import { useEditingCharKey } from './store';

const initValue: CharBox = {
  id: '',
  userId: '',
  characterKeys: {}, // 持有的干员
  updatedDate: '', // 更新日期
};

// Tier list state all in one.
export default function useCharBox() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // state
  const charBoxQueryKey = useRef('skin-box');
  const { user } = useMeta();
  const { editingCharKey, updateEditingCharKey } = useEditingCharKey();

  const { isLoading, error, data } = useQuery(charBoxQueryKey.current, async () => {
    const { data } = await new CharBoxServer().getCharBoxByUserId({ userId: user.id });
    if (!data) {
      return initValue;
    } else {
      if (editingCharKey === '') updateEditingCharKey(Object.keys(data.characterKeys ?? {})?.[0] ?? '');
      return data;
    }
  });

  const uploadCharBox = useMutation(
    async () =>
      data?.id
        ? await new CharBoxServer().updateOne({
            charBox: { ...data, userId: user.id },
          })
        : await new CharBoxServer().createOne({
            charBox: { ...data, userId: user.id },
          }),
    {
      onSuccess: () => {
        // successNotice('自动保存成功');
        // queryClient.invalidateQueries(charBoxQueryKey.current);
      },
    },
  );

  const updateLocalCharBox = useMutation(
    async (charBox: CharBox) => {
      queryClient.setQueryData(charBoxQueryKey.current, charBox);
    },
    {
      onSuccess: () => {
        uploadCharBox.mutate();
      },
    },
  );

  const updateChar = useMutation(async (char: Character) => {
    const c = { ...data?.characterKeys };
    c[char.key] = { ...char };
    updateLocalCharBox.mutate({
      ...data,
      characterKeys: c,
    });
  });

  const addCharToBox = useMutation(async (chars: { [key: string]: Character }) => {
    const c = { ...data?.characterKeys };
    updateLocalCharBox.mutate({
      ...data,
      characterKeys: {
        ...data?.characterKeys,
        ...chars,
      },
    });
  });

  const delCharFromBox = useMutation(async (keys: string[]) => {
    const c = { ...data?.characterKeys };
    keys.forEach((key) => delete c[key]);
    updateLocalCharBox.mutate({
      ...data,
      characterKeys: c,
    });
  });

  return {
    charBox: data,
    uploadCharBox,
    updateLocalCharBox,
    addCharToBox,
    delCharFromBox,
    updateChar,
    isLoading,
  };
}
