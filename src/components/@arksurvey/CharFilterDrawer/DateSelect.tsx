import { Box, RangeSlider } from '@mantine/core';
import { format } from 'date-fns';
import { timeMarks } from 'src/contexts';
import { FilterItemBox } from './FilterItemBox';

interface DateSelectProps {
  disabled?: boolean;
  value: [number, number];
  classNames?: Record<'iconWrapper' | 'checked', string>;
  onChange: (value: [number, number]) => void;
  label?: string;
}

export function DateSelect({ value, classNames, onChange, label, disabled }: DateSelectProps) {
  return (
    <FilterItemBox label={label}>
      <Box sx={{ padding: '15px 8px', paddingTop: '10px' }}>
        <RangeSlider
          disabled={disabled}
          styles={{
            markLabel: {
              fontSize: '10px',
              marginTop: 5,
            },
          }}
          size="xs"
          label={(val) =>
            format(
              new Date((timeMarks[0].ts + (val * (timeMarks[timeMarks.length - 1].ts - timeMarks[0].ts)) / 100) * 1000),
              'yyyy/MM/dd',
            )
          }
          value={value}
          defaultValue={[0, 100]}
          onChange={onChange}
          marks={timeMarks
            .map((item) => {
              return {
                value: ((item.ts - timeMarks[0].ts) / (timeMarks[timeMarks.length - 1].ts - timeMarks[0].ts)) * 100,
                label: item.name,
              };
            })
            .filter((item) => item.label)}
        />
      </Box>
    </FilterItemBox>
  );
}
