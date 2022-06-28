import { useTierListKey } from './store';
import { TierList, TierListServer } from 'src/service/TierListServer';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMeta } from '../store';

const initValueFactory: (key: string) => TierList = (key) => ({
  id: '',
  name: '',
  key,
  value: 1,
  updatedDate: new Date().getTime().toString(),
  tiers: [
    {
      name: '',
      value: 1,
      characterKeys: [],
    },
    {
      name: '',
      value: 2,
      characterKeys: [],
    },
    {
      name: '',
      value: 3,
      characterKeys: [],
    },
    {
      name: '',
      value: 4,
      characterKeys: [],
    },
    {
      name: '',
      value: 5,
      characterKeys: [],
    },
  ],
});

// Tier list state all in one.
export default function useTierList() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  // state
  const tierListQueryKey = useRef('tier-list');
  const { user } = useMeta();
  const { tierListKey } = useTierListKey();

  const { isLoading, error, data } = useQuery(tierListQueryKey.current, async () => {
    if (!tierListKey) {
      // errorNotice('Select first!');
      return;
    }
    const { data } = await new TierListServer().getOne({ userId: user.id, key: tierListKey });

    if (!data?.id) {
      return initValueFactory(tierListKey);
    }
    return data;
  });

  const uploadTierList = useMutation(
    async () => {
      const result = data?.id
        ? await new TierListServer().updateOne({
            tierList: { ...data, userId: user.id },
          })
        : await new TierListServer().createOne({
            tierList: { ...data, userId: user.id },
          });
      queryClient.setQueryData(tierListQueryKey.current, result.data);
      return result;
    },
    {
      onSuccess: () => {
        // successNotice(t('upload-success'));
        // queryClient.invalidateQueries(tierListQueryKey.current);
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
        uploadTierList.mutate();
        // queryClient.invalidateQueries('tier-list');
      },
    },
  );

  const pickedCharKeys = useMemo(() => {
    let keys: string[] = [];
    data?.tiers?.forEach((tier) => {
      keys.push(...tier.characterKeys);
    });
    return keys;
  }, [data?.tiers]);

  return { tierList: data, uploadTierList, pickedCharKeys, updateLocalTierList, isLoading };
}
