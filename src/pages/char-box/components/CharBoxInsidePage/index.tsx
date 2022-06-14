import { useSelector } from 'react-redux';
import useCharFilterDrawer from 'src/components/CharFilterDrawer/useCharFilterDrawer';
import { useWindowSize } from 'src/hooks';
import { RootState } from 'src/store';
import CharDataUnit from 'src/components/CharDataUnit';
import CharExchangeAffix from '../CharExchangeAffix';
import CharExchangeBox from '../CharExchangeBox';

export default function CharBox() {
  const setting = useSelector((state: RootState) => state.setting);
  const { menuOpen } = useSelector((state: RootState) => state.user);
  const { downSM } = useWindowSize();
  const { setOpened, drawerContext } = useCharFilterDrawer();

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
