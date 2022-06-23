import useCharFilterDrawer from 'src/components/@arksurvey/CharFilterDrawer/useCharFilterDrawer';
import SkinChangeBox from './SkinChangeBox';

export default function CharBox() {
  const { setOpened, drawerContext, filterChar } = useCharFilterDrawer();

  return (
    <>
      <SkinChangeBox filterChar={filterChar} onClickFilter={() => setOpened(true)} />
      {drawerContext}
    </>
  );
}
