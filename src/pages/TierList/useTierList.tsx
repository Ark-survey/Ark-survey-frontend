import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import { useCharBoxSelectKeys, useTierListKey } from './store';
import { TierList, TierListServer } from 'src/service/TierListServer';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useRef } from 'react';
import { errorNotice, successNotice } from 'src/components/Notice';
import { useTranslation } from 'react-i18next';

const initValue: TierList = {
  id: '',
  updatedDate: new Date().getTime().toString(),
  tiers: [
    {
      value: 1,
      characterKeys: [],
    },
    {
      value: 2,
      characterKeys: [],
    },
    {
      value: 3,
      characterKeys: [],
    },
    {
      value: 4,
      characterKeys: [],
    },
    {
      value: 5,
      characterKeys: [],
    },
  ],
};

// Tier list state all in one.
export default function useTierList() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // state
  const tierListQueryKey = useRef('tier-list');
  const userData = useSelector((state: RootState) => state.user.userData);
  const { resetSelectKeys } = useCharBoxSelectKeys();
  const { tierListKey } = useTierListKey();

  const { isLoading, error, data } = useQuery(tierListQueryKey.current, async () => {
    if (!tierListKey) {
      errorNotice('Select first!');
      return;
    }
    const { data } = await new TierListServer().getOne({ userId: userData?.id ?? '', key: tierListKey });
    if (!data) {
      successNotice('初稿已创建');
      return initValue;
    }
    resetSelectKeys();
    return data;
  });

  const uploadTierList = useMutation(
    async () =>
      data?.id
        ? await new TierListServer().updateOne({
            tierList: { ...data, userId: userData?.id ?? '' },
          })
        : await new TierListServer().createOne({
            tierList: { ...data, userId: userData?.id ?? '' },
          }),
    {
      onSuccess: () => {
        successNotice(t('upload-success'));
        queryClient.invalidateQueries(tierListQueryKey.current);
      },
    },
  );

  // Only change local state temporarily.
  // If you want to change original data, please use uploadTierList.
  const updateLocalTierList = useMutation(
    async (tierList: TierList) => {
      queryClient.setQueryData(tierListQueryKey.current, tierList);
    },
    {
      onSuccess: () => {
        // successNotice(t('upload-success'));
        // queryClient.invalidateQueries('tier-list');
      },
    },
  );

  return { tierList: data, uploadTierList, updateLocalTierList, isLoading };
}
