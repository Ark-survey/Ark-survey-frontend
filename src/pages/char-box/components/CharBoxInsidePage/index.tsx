import { Stack, Space } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CharBoxServer } from 'src/api/CharBoxServer';
import useCharFilterDrawer from 'src/components/CharFilterDrawer/useCharFilterDrawer';
import { useWindowSize } from 'src/hooks';
import { RootState } from 'src/store';
import { updateCharBoxId, updateCharInBox } from 'src/store/slice/charBoxSlice';
import CharDataUnit from 'src/components/CharDataUnit';
import CharExchangeAffix from '../CharExchangeAffix';
import CharExchangeBox from '../CharExchangeBox';

export default function CharBox() {
  const setting = useSelector((state: RootState) => state.setting);
  const { menuOpen, userData } = useSelector((state: RootState) => state.user);
  const { downSM } = useWindowSize();
  const { setOpened, drawerContext } = useCharFilterDrawer();
  const dispatch = useDispatch();

  const fetchCharData = async () => {
    try {
      const result = await new CharBoxServer().getCharBoxByUserId({ userId: userData?.id ?? '' });
      if (!result.data) {
        return await new CharBoxServer().createOne({ charBox: { userId: userData?.id ?? '', characterKeys: {} } });
      }
      return result;
    } catch {
      return { data: null };
    }
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const { data } = await fetchCharData();
      if (data) {
        dispatch(updateCharInBox(data.characterKeys));
        dispatch(updateCharBoxId(data.id ?? ''));
      }
    }, 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!(setting.charBoxEditing && downSM) ? (
        <CharExchangeBox onClickFilter={() => setOpened(true)} />
      ) : (
        !menuOpen && <CharExchangeAffix onClickFilter={() => setOpened(true)} />
      )}
      {setting.charBoxEditing && <CharDataUnit />}
      {drawerContext}
    </>
  );
}
