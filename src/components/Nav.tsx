import { Box, SegmentedControl } from "@mantine/core";

export default function Index() {
  return (<Box
    sx={{
      display: "flex",
      borderBottom: "2px #eee solid",
      marginBottom: '20px',
      paddingBottom: "10px",
      padding: "5px",
      flexFlow: 'row wrap',
      width: '100%',
      height: '90px',
      boxSizing: 'border-box',
      alignItems: 'end',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        fontSize: "32px",
        paddingLeft: 5,
        fontWeight: 900,
        marginRight: '20px',
        marginTop: '6px',
        whiteSpace: 'nowrap',
      }}
    >
      <Box>
        {'ArkSurvey'}
        <Box sx={
          {
            fontSize: '10px',
            paddingBottom: "10px",
            textAlign: 'center'
          }
        }>{'明日方舟调查大数据'}</Box>
      </Box>
      <Box sx={
        {
          fontSize: '10px',
          paddingBottom: "10px",
          textAlign: 'right'
        }
      }>{'v0.1.5(Beta)'}</Box>
    </Box>
    <Box sx={{ paddingBottom: '20px', flex: 1 }}>
      <SegmentedControl
        disabled
        sx={{ float: 'right' }}
        data={[
          { label: '强度风评', value: '强度' },
          { label: 'Box 练度', value: '练度' },
        ]}
      />
    </Box>
  </Box>)
}