import { Box, SegmentedControl } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { updateViewPageId } from 'src/store/slice/userSlice';

export default function Index() {
  const user = useSelector((state: RootState) => state.user);
  const userTierList = useSelector((state: RootState) => state.userTierList);
  const dispatch = useDispatch();
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
            ArkSurvey
            <Box
              sx={{
                fontSize: '10px',
                paddingBottom: '10px',
                textAlign: 'center',
              }}
            >
              明日方舟调查大数据
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
              { label: '强度风评样本提交', value: 'tier-list-commit' },
              { label: '强度风评实时统计', value: 'tier-list-real-time' },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
}
