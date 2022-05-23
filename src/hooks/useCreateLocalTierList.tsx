import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { addTierList } from 'src/store/slice/TierListSlice';

export function useCreateLocalTierList() {
  const tierList = useSelector((state: RootState) => state.tierList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tierList.tierLists[tierList.currentEditKey]) dispatch(addTierList(tierList.currentEditKey));
  }, [dispatch, tierList.currentEditKey, tierList.tierLists]);
}
