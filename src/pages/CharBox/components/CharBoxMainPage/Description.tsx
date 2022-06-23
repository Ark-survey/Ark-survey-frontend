import { List, Space, Title } from '@mantine/core';
import CardRoot from 'src/components/CardRoot';

export default function Index() {
  return (
    <CardRoot>
      <Title order={5}>填写你的 BOX 与皮肤持有情况</Title>
      <Space h={5} />
      <List>
        <List.Item>
          进入页面后，先选择你持有的干员，保存后点击最下方的【持有编辑模式】按钮切换到【练度编辑模式】页面。
        </List.Item>
        <List.Item>
          皮肤盒功能预计于 0.5
          版本更新，在此之前所有皮肤皆可自由选择，待功能更新后请先提交一次皮肤持有情况，之后便可正常编辑 BOX。
        </List.Item>
        <List.Item>
          <del>你可以切换你已经持有的干员皮肤，精二皮肤在精二后解锁。</del>
        </List.Item>
        <List.Item>
          <del>要想解锁未持有的干员皮肤，请点击干员皮肤右上角的【+】按钮，此操作会提交至皮肤盒更改。</del>
        </List.Item>
      </List>
    </CardRoot>
  );
}
