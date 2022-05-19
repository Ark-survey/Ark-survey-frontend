import { Box, SegmentedControl } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { updateViewPageId } from 'src/store/slice/userSlice';

export default function Index() {
  const user = useSelector((state: RootState) => state.user);
  const userTierList = useSelector((state: RootState) => state.userTierList);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handlePageControlChange = (value: string) => {
    dispatch(updateViewPageId(value));
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: '2px #eee solid',
        marginBottom: '20px',
      }}
    >
      <Box
        sx={{
          margin: '0 auto',
          maxWidth: '1500px',
          display: 'flex',
          paddingBottom: '20px',
          padding: '5px',
          flexFlow: 'row wrap',
          width: '100%',
          height: '90px',
          boxSizing: 'border-box',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            fontSize: '32px',
            paddingLeft: 5,
            fontWeight: 900,
            whiteSpace: 'nowrap',
          }}
        >
          <Box>
            {t('header.title')}
            <Box
              sx={{
                fontSize: '10px',
                paddingBottom: '10px',
                textAlign: 'center',
              }}
            >
              {t('header.ark-survey')}
            </Box>
          </Box>
          <Box
            sx={{
              fontSize: '10px',
              paddingBottom: '10px',
              textAlign: 'right',
            }}
          >
            {'v' + user.version}
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <SegmentedControl
            disabled={user.newTierList || !userTierList?.id}
            orientation="vertical"
            value={user.viewPageId}
            onChange={handlePageControlChange}
            data={[
              { label: t('header.sample-submission'), value: 'tier-list-commit' },
              { label: t('header.statistics'), value: 'tier-list-real-time' },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
}
