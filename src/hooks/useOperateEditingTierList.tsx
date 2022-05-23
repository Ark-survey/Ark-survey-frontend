import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tier } from 'src/api/TierListServer';
import { editingTierList, updateEditingTierList } from 'src/store/slice/TierListSlice';

export function useOperateEditingTierList() {
  const tierList = useSelector(editingTierList);
  const dispatch = useDispatch();
  const findTierIndexByValue = useCallback(
    (tierValue: number) => tierList.tiers.findIndex((it) => it.value === tierValue),
    [tierList.tiers],
  );
  const findTierByValue = useCallback(
    (tierValue: number) => tierList.tiers.find((it) => it.value === tierValue),
    [tierList.tiers],
  );

  const updateChar = useCallback(
    (characterKeys: string[], tier?: Tier) =>
      dispatch(
        updateEditingTierList({
          tierList: {
            ...tierList,
            tiers: [
              ...tierList.tiers,
              {
                ...tier,
                characterKeys,
              },
            ],
          },
        }),
      ),
    [dispatch, tierList],
  );

  const updateTier = useCallback(
    (tiers: Tier[]) =>
      dispatch(
        updateEditingTierList({
          tierList: {
            ...tierList,
            tiers: sortTiersUp(tiers),
          },
        }),
      ),
    [dispatch, tierList],
  );

  const sortTiersUp = (tiers: Tier[]) => tiers.sort((a, b) => (a.value ?? 0) - (b.value ?? 0));

  // 批量添加 tier
  const addTier = useCallback(
    (tier: Tier) => {
      const newTiers = [...tierList.tiers, tier];
      updateTier(newTiers);
    },
    [tierList.tiers, updateTier],
  );

  // 删除当前正在编辑的 tier list 的
  const updateOneTier = useCallback(
    (tierIndex: number, newTier: Tier) => {
      const newTiers = [...tierList.tiers].splice(tierIndex, 1);
      newTiers.push(newTier);
      updateTier(newTiers);
    },
    [tierList, updateTier],
  );

  // 删除当前正在编辑的 tier list 的
  const delOneTier = useCallback(
    (tierIndex: number) => {
      const newTiers = [...tierList.tiers].splice(tierIndex, 1);
      updateTier(newTiers);
    },
    [tierList, updateTier],
  );

  // 批量添加 char
  const addTierChars = useCallback(
    (tierValue: number, charKeys: string[]) => {
      const tier = findTierByValue(tierValue);
      const characterKeys = [...(tier?.characterKeys ?? []), ...charKeys];
      updateChar(characterKeys, tier);
    },
    [findTierByValue, updateChar],
  );

  const delTierOneChar = useCallback(
    (tierValue: number, charKey: string) => {
      const tier = findTierByValue(tierValue);
      const characterKeys = tier?.characterKeys.splice(tier.characterKeys.indexOf(charKey), 1) ?? [];
      updateChar(characterKeys, tier);
    },
    [findTierByValue, updateChar],
  );

  const delTierAllChar = useCallback(
    (tierValue: number) => {
      const tier = findTierByValue(tierValue);
      updateChar([], tier);
    },
    [findTierByValue, updateChar],
  );

  const delAllTierChar = useCallback(() => {
    dispatch(
      updateEditingTierList({
        tierList: {
          ...tierList,
          tiers: tierList.tiers.map((it) => ({
            ...it,
            characterKeys: [],
          })),
        },
      }),
    );
  }, [dispatch, tierList]);

  return {
    findTierIndexByValue,
    addTierChars,
    updateOneTier,
    delTierOneChar,
    addTier,
    delOneTier,
    delTierAllChar,
    delAllTierChar,
  };
}
