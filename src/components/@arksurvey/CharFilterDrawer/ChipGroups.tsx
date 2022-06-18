import { Chip, createStyles } from '@mantine/core';
import { FilterItemBox } from './FilterItemBox';

interface ChipGroupsProps {
  disabled?: boolean;
  tags: any[];
  classNames?: Record<'iconWrapper' | 'checked', string>;
  values: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

const useStyles = createStyles((theme, _params, getRef) => ({
  iconWrapper: {
    ref: getRef('iconWrapper'),
  },

  checked: {
    backgroundColor: `${theme.colors.blue[6]} !important`,
    color: theme.white,

    [`& .${getRef('iconWrapper')}`]: {
      color: theme.white,
    },
  },
}));

export function ChipGroups({ tags, classNames, disabled, onChange, label, values }: ChipGroupsProps) {
  const { classes } = useStyles();
  return (
    <FilterItemBox label={label}>
      <Chip.Group multiple value={values} onChange={onChange}>
        {tags.map((item) => (
          <Chip classNames={classes} size="xs" disabled={disabled} value={item.value} key={item.value}>
            {item.name}
          </Chip>
        ))}
      </Chip.Group>
    </FilterItemBox>
  );
}
