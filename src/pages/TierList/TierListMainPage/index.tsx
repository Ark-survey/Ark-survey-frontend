import { ActionIcon } from '@mantine/core';
import CardRoot from 'src/components/CardRoot';
import PageHeader from 'src/components/PageHeader';
import { IconArrowLeft } from '@tabler/icons';
import Description from './Description';
import useEnvSelect from 'src/components/@arksurvey/EnvSelecter/useEnvSelect';

export default function Index({ inside, onInside }: { inside: boolean; onInside?: () => void }) {
  const { envLabel, EnvSelectContent } = useEnvSelect({
    onClickEnvButton: (key: string) => {
      onInside?.();
    },
  });

  return (
    <>
      <PageHeader title={inside ? envLabel : '强度评价'} inside={inside}>
        <ActionIcon size="md">
          <IconArrowLeft onClick={onInside} />
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
