import useCharFilterDrawer from 'src/components/@arksurvey/CharFilterDrawer/useCharFilterDrawer';
import { useWindowSize } from 'src/hooks/useWindowSize';
import CharDataUnit from 'src/components/@arksurvey/CharDataUnit';
import CharExchangeAffix from '../CharExchangeAffix';
import CharExchangeBox from '../CharExchangeBox';
import { useSetting } from 'src/pages/store';

export default function CharBox() {
  const { setting } = useSetting();
  const { downSM } = useWindowSize();
  const { setOpened, drawerContext, filterChar } = useCharFilterDrawer();

  return (
    <>
      {!(setting.charBoxEditing && downSM) ? (
        <CharExchangeBox filterChar={filterChar} onClickFilter={() => setOpened(true)} />
      ) : (
        !setting.menuOpened && <CharExchangeAffix filterChar={filterChar} onClickFilter={() => setOpened(true)} />
      )}
      {setting.charBoxEditing && <CharDataUnit />}
      {drawerContext}
    </>
  );
}
