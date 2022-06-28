import { ActionIcon } from '@mantine/core';
import CardRoot from 'src/components/CardRoot';
import PageHeader from 'src/components/PageHeader';
import { IconArrowLeft } from '@tabler/icons';
import Description from './Description';
import useEnvSelect from 'src/components/@arksurvey/EnvSelect/useEnvSelect';

export default function Index({
  inside,
  onInsideChange,
}: {
  inside: boolean;
  onInsideChange?: (inside: boolean, key?: string) => void;
}) {
  const { envLabel, EnvSelectContent } = useEnvSelect({
    onClickEnvButton: (key?: string) => {
      onInsideChange?.(true, key);
    },
  });

  return (
    <>
      <PageHeader title={inside ? envLabel : '干员排行'} inside={inside}>
        <ActionIcon size="md">
          <IconArrowLeft onClick={() => onInsideChange?.(false)} />
        </ActionIcon>
      </PageHeader>
      {!inside && (
        <>
          <Description />
          <CardRoot>{EnvSelectContent}</CardRoot>
        </>
      )}
    </>
  );
}
