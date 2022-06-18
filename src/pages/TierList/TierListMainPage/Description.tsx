import { List, Space, Title } from '@mantine/core';
import CardRoot from 'src/components/CardRoot';

export default function Index() {
  return (
    <CardRoot>
      <Title order={5}>
        评价一个干员在某维度下，所有干员范围内的<em style={{ color: 'red' }}>相对强度</em>
      </Title>
      <Space h={5} />
      <List>
        <List.Item>
          选择你想评价的能力维度或者对某个环境内各干员的发挥进行<b>排名式评价</b>
        </List.Item>
        <List.Item>评价算法是相对的，你可以随意增加删除等级，找到自己认为合适的等级划分，由高到低排列即可</List.Item>
        <List.Item>你当然可以将不同星级的干员排在一起，统计结果会自动区分开来</List.Item>
        <List.Item>
          【博士数据】与【干员数据】会影响你的【强度评价】<b>样本权重</b>
        </List.Item>
        <List.Item>
          如果距离你上次提交样本的时间<b>超过 14 天</b>，或者你评价的<b>等级数小于 3 /干员数少于 7</b>
          ，这个表单将不会计入【有效样本】，记得更新你的等级表哦
        </List.Item>
      </List>
    </CardRoot>
  );
}
