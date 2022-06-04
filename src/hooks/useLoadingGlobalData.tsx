import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { MetaDataServer } from 'src/api/MetaDataServer.';
import { successNotice } from 'src/pages/tier-list/components/Notice';
import { updateVersion } from 'src/store/slice/userSlice';

export function useLoadingGlobalData() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchLatestMetaData = async () => {
    return await new MetaDataServer().latest();
  };

  const handleLoadData = async () => {
    const { data } = await fetchLatestMetaData();
    dispatch(updateVersion(data.version ?? ''));
    successNotice(t('basic-data-updated-successfully'));
  };

  useEffect(() => {
    const timeout = setTimeout(() => handleLoadData(), 100);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
