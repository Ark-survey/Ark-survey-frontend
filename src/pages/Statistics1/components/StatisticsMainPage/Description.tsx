import { List, Space, Title } from '@mantine/core';
import CardRoot from 'src/components/CardRoot';

export default function Index() {
  return (
    <CardRoot>
      <Title order={5}>干员各种数据的排行</Title>
      <Space h={5} />
      <List>
        <List.Item>查看对应表单的统计数据</List.Item>
        <List.Item>点击干员头像可以展开详细数据</List.Item>
        <List.Item>练度统计数据正在开发中</List.Item>
      </List>
    </CardRoot>
  );
}
