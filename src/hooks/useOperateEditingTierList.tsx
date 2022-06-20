import { useCallback } from 'react';
import useTierList from 'src/pages/TierList/useTierList';
import { Tier } from 'src/service/TierListServer';

export function useOperateEditingTierList() {
  const { tierList, updateLocalTierList } = useTierList();

  const findTierIndexByValue = useCallback(
    (tierValue: number) => tierList?.tiers?.findIndex((it) => it.value === tierValue),
    [tierList?.tiers],
  );

  const updateChar = useCallback(
    (characterKeys: string[], tierIndex: number) => {
      if (tierList) {
        const tiers = [...(tierList?.tiers ?? [])];
        tiers[tierIndex] = {
          ...tiers[tierIndex],
          characterKeys,
        };
        updateLocalTierList.mutate({
          ...tierList,
          tiers,
        });
      }
    },
    [tierList, updateLocalTierList],
  );

  const updateTier = useCallback(
    (tiers: Tier[]) => {
      updateLocalTierList.mutate({
        ...tierList,
        tiers: sortTiersUp(tiers),
      });
    },
    [tierList, updateLocalTierList],
  );

  const sortTiersUp = (tiers: Tier[]) => tiers.sort((a, b) => (a.value ?? 0) - (b.value ?? 0));

  // 批量添加 tier
  const addTier = useCallback(
    (tier: Tier) => {
      const newTiers = [...(tierList?.tiers ?? []), tier];
      updateTier(newTiers);
    },
    [tierList, updateTier],
  );

  // 删除当前正在编辑的 tier list 的
  const updateOneTier = useCallback(
    (tierIndex: number, newTier: Tier) => {
      const newTiers = [...(tierList?.tiers ?? [])];
      newTiers[tierIndex] = newTier;
      updateTier(newTiers);
    },
    [tierList, updateTier],
  );

  // 删除当前正在编辑的指定 tier
  const delOneTier = useCallback(
    (tierIndex: number) => {
      const newTiers = [...(tierList?.tiers ?? [])];
      newTiers.splice(tierIndex, 1);
      updateTier(newTiers);
    },
    [tierList, updateTier],
  );

  // 批量添加 char
  const addTierChars = useCallback(
    (tierIndex: number, charKeys: string[]) => {
      const characterKeys = [...((tierList?.tiers ?? [])[tierIndex]?.characterKeys ?? []), ...charKeys];
      updateChar(characterKeys, tierIndex);
    },
    [tierList, updateChar],
  );

  const moveTierChars = useCallback(
    (fromTierIndex: number, toTierIndex: number, charKeys: string) => {
      const newTiers = [...(tierList?.tiers ?? [])];
      const fromCharacterKeys = [...(newTiers[fromTierIndex]?.characterKeys ?? [])];
      fromCharacterKeys.splice(fromCharacterKeys.indexOf(charKeys), 1);
      const toCharacterKeys = [...(newTiers[toTierIndex]?.characterKeys ?? []), charKeys];

      newTiers[fromTierIndex] = { ...newTiers[fromTierIndex], characterKeys: fromCharacterKeys };
      newTiers[toTierIndex] = { ...newTiers[toTierIndex], characterKeys: toCharacterKeys };

      updateLocalTierList.mutate({
        ...tierList,
        tiers: newTiers,
      });
    },
    [tierList, updateLocalTierList],
  );

  const delTierOneChar = useCallback(
    (tierIndex: number, charKey: string) => {
      const characterKeys = [...((tierList?.tiers ?? [])[tierIndex]?.characterKeys ?? [])];
      characterKeys.splice(characterKeys.indexOf(charKey), 1);
      updateChar(characterKeys, tierIndex);
    },
    [tierList, updateChar],
  );

  const delTierAllChar = useCallback(
    (tierIndex: number) => {
      updateChar([], tierIndex);
    },
    [updateChar],
  );

  const delAllTierChar = useCallback(() => {
    updateLocalTierList.mutate({
      ...tierList,
      tiers: (tierList?.tiers ?? []).map((it) => ({
        ...it,
        characterKeys: [],
      })),
    });
  }, [tierList, updateLocalTierList]);

  return {
    findTierIndexByValue,
    addTierChars,
    updateOneTier,
    moveTierChars,
    delTierOneChar,
    addTier,
    delOneTier,
    delTierAllChar,
    delAllTierChar,
  };
}
