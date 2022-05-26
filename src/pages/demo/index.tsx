import { Box, Title } from '@mantine/core';
import { useRef } from 'react';
import CharAvatar from 'src/components/image-container/CharAvatar';
import SkillIcon from 'src/components/image-container/SkillIcon';

export default function Demo() {
  const parent = useRef<HTMLDivElement>(null);
  return (
    <Box p="lg">
      <Box>
        <Title order={5}>这是开发 Demo 页面</Title>
        <Box ref={parent}>
          <CharAvatar imgKey="char_010_chen2" width={190} />
          <CharAvatar imgKey="char_010_chen_nian#2" width={80} />
          <CharAvatar imgKey="char_151_myrtle_2" width={70} />
          <CharAvatar imgKey="char_123_fang_winter#1" width={60} />
          <CharAvatar imgKey="char_101_sora_2" width={50} />
          <CharAvatar imgKey="char_101_sora" width={40} />
          <CharAvatar imgKey="char_017_huang_as#1" width={30} />
          <SkillIcon imgKey="skill_icon_skchr_aguard_1" width={70} />
          <SkillIcon imgKey="skill_icon_skchr_cuttle_2" width={60} />
          <SkillIcon imgKey="skill_icon_skchr_demkni_1" width={50} />
          <SkillIcon imgKey="skill_icon_skchr_deepcl_2" width={40} />
          <SkillIcon imgKey="skill_icon_skchr_demkni_1" width={30} />
        </Box>
      </Box>
    </Box>
  );
}
