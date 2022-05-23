import { Box, Title, Text, Container } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import LoadDataPaper from './LoadDataPaper';

export default function Index() {
  const userTierList = useSelector((state: RootState) => state.userTierList);
  const user = useSelector((state: RootState) => state.user);
  return (
    <Container size={1200}>
      <Box p="lg">
        <Title order={1}>欢迎来到 ArkSurvey ！</Title>
        <Text py="md">
          聪明的你肯定发现了，这个网站是用来调查、统计、展现明日方舟玩家的各种数据，包括主观的强度评价、客观的练度等。
        </Text>
        {!user?.userData.id && <LoadDataPaper />}
        <Box py="md">
          <Text>Q：应该怎么用呢？</Text>
          <Text>
            A：如果你是新人的话，请先新建一个用户
            ID（真的，点一下就行不用输其他东西），记得复制保存哦，以后你可以通过这个 ID
            加载你之前保存的数据（当然别人也可以通过这个 ID
            修改你的数据哦，注意不要泄露了），之后就是填填填啦，也可以去看统计页面了。
          </Text>
        </Box>
        <Box py="md">
          <Text>Q：哦，为什么要做这么一个网站呢，是用来 TTK 吗？</Text>
          <Text>
            A：<del>确实，本网站主要就是用来为 TTK 提供数据的</del>
            NO，本网站一是为了给萌新一个大数据向的养成指导，或者给老玩家一个补全BOX的方向，
            二是发掘出一些普通方法无法发现的有趣数据，至于其他用途你们可以自行发掘（确信
          </Text>
        </Box>
        <Box py="md">
          <Text>Q：感觉挺未来可期啊，有后续的更新计划吗？</Text>
          <Text>
            A：<del>别问，问就是没有</del>先定个小目标，国庆前完成 v1.0，到时候页面上面就不会有灰色按钮了，
            而且应该还会额外增加几个关于博士自己的表单。
          </Text>
        </Box>
        <Box py="md">
          <Text>Q：你这首页怎么画风和其他页面不一样？</Text>
          <Text>
            A：因为缺人哦，如果多来几个大佬，估计这首页就不一样了，所以大佬快来加入我们吧！（不只是程序哦，美工、文案、设计、运营都没人
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
