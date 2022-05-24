import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tier } from 'src/api/TierListServer';
import { editingTierList, updateEditingTierList } from 'src/store/slice/TierListSlice';

export function useOperateEditingTierList() {
  const tierList = useSelector(editingTierList);

  const dispatch = useDispatch();
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
        console.log(tiers);

        dispatch(
          updateEditingTierList({
            tierList: {
              ...tierList,
              tiers,
            },
          }),
        );
      }
    },
    [dispatch, tierList],
  );

  const updateTier = useCallback(
    (tiers: Tier[]) => {
      dispatch(
        updateEditingTierList({
          tierList: {
            ...tierList,
            tiers: sortTiersUp(tiers),
          },
        }),
      );
    },
    [dispatch, tierList],
  );

  const sortTiersUp = (tiers: Tier[]) => tiers.sort((a, b) => (a.value ?? 0) - (b.value ?? 0));

  // 批量添加 tier
  const addTier = useCallback(
    (tier: Tier) => {
      console.log(1111);

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

      dispatch(
        updateEditingTierList({
          tierList: {
            ...tierList,
            tiers: newTiers,
          },
        }),
      );
    },
    [dispatch, tierList],
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
    dispatch(
      updateEditingTierList({
        tierList: {
          ...tierList,
          tiers: (tierList?.tiers ?? []).map((it) => ({
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
    moveTierChars,
    delTierOneChar,
    addTier,
    delOneTier,
    delTierAllChar,
    delAllTierChar,
  };
}
