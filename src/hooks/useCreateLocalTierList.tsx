import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  updateAllCharacterPicked,
  updateAllCharacterSelecting,
  updateCharacterPicked,
} from 'src/store/slice/characterSlice';
import { addTierList } from 'src/store/slice/TierListSlice';

export function useCreateLocalTierList() {
  const tierList = useSelector((state: RootState) => state.tierList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tierList.tierLists[tierList.currentEditKey]) {
      dispatch(addTierList(tierList.currentEditKey));
    }
  }, [dispatch, tierList, tierList.currentEditKey]);

  useEffect(() => {
    dispatch(updateAllCharacterPicked(false));
    dispatch(updateAllCharacterSelecting(false));
    if (tierList.tierLists[tierList.currentEditKey]) {
      tierList.tierLists[tierList.currentEditKey].tiers?.forEach((item) => {
        item.characterKeys.forEach((key) => {
          dispatch(updateCharacterPicked({ key, picked: true }));
        });
      });
    }
  }, [dispatch, tierList.currentEditKey, tierList.tierLists]);
}
