import { Box, RangeSlider } from "@mantine/core";
import { format } from "date-fns";
import { TimeMarks } from "src/contexts";

interface DateSelectProps {
  classNames?: Record<"iconWrapper" | "checked", string>;
  onChange?: (value: string[]) => void;
  label?: string;
}

export function DateSelect({ classNames, onChange, label }: DateSelectProps) {
  return (
    <Box
      sx={{
        margin: "20px 0",
        border: "2px #eee solid",
        padding: "10px",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      {label && (
        <Box
          sx={{
            position: "absolute",
            background: "#fff",
            fontWeight: 600,
            fontSize: "12px",
            padding: "2px 5px",
            top: "-12px",
            left: "20px",
          }}
        >
          {label}
        </Box>
      )}

      <Box sx={{ padding: "15px 8px", paddingTop: "10px" }}>
        <RangeSlider
          styles={{
            markLabel: {
              fontSize: "10px",
              marginTop: 5,
            },
          }}
          label={(val) =>
            format(
              new Date(
                (TimeMarks[0].ts +
                  (val *
                    (TimeMarks[TimeMarks.length - 1].ts - TimeMarks[0].ts)) /
                    100) *
                  1000
              ),
              "yyyy/MM/dd"
            )
          }
          defaultValue={[0, 100]}
          marks={TimeMarks.map((item) => {
            return {
              value:
                ((item.ts - TimeMarks[0].ts) /
                  (TimeMarks[TimeMarks.length - 1].ts - TimeMarks[0].ts)) *
                100,
              label: item.name,
            };
          }).filter((item) => item.label)}
        />
      </Box>
    </Box>
  );
}
