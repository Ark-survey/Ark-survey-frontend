import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useRef } from 'react';
import { successNotice } from 'src/components/Notice';
import { useTranslation } from 'react-i18next';
import { useMeta } from '../store';
import { CharSkinBox, CharSkinBoxServer } from 'src/service/CharSkinBoxServer';

const initValue: CharSkinBox = {
  id: '',
  userId: '',
  charSkinKeys: [], // 持有的干员皮肤 keys
  updatedDate: '', // 更新日期
};

// Tier list state all in one.
export default function useSkinBox() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // state
  const skinBoxQueryKey = useRef('skin-box');
  const { user } = useMeta();

  const { isLoading, error, data } = useQuery(skinBoxQueryKey.current, async () => {
    const { data } = await new CharSkinBoxServer().getCharSkinBoxByUserId({ userId: user.id });
    if (!data) {
      return initValue;
    }
    return data;
  });

  const uploadSkinBox = useMutation(
    async () =>
      data?.id
        ? await new CharSkinBoxServer().updateOne({
            charSkinBox: { ...data, userId: user.id },
          })
        : await new CharSkinBoxServer().createOne({
            charSkinBox: { ...data, userId: user.id },
          }),
    {
      onSuccess: () => {
        successNotice(t('upload-success'));
        queryClient.invalidateQueries(skinBoxQueryKey.current);
      },
    },
  );

  // Only change local state temporarily.
  // If you want to change original data, please use uploadSkinBox.
  const updateLocalSkinBox = useMutation(
    async (skinBox: CharSkinBox) => {
      queryClient.setQueryData(skinBoxQueryKey.current, skinBox);
    },
    {
      onSuccess: () => {
        // successNotice(t('upload-success'));
        // queryClient.invalidateQueries('tier-list');
      },
    },
  );

  return { skinBox: data, uploadSkinBox, updateLocalSkinBox, isLoading };
}
