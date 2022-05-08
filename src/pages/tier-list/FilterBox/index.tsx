import { Button, createStyles, Box } from "@mantine/core";
import { useMemo } from "react";
import { rate, profession, accessChannel, sex, deployment } from "src/contexts";
import { ChipGroups } from "../components/ChipGroups";
import { DateSelect } from "../components/DateSelect";

export interface FilterType {
  chipGroup: { [x: string]: string[] }, dateRange: [number, number]
}

interface FilterBoxProps {
  filters: FilterType
  onChipsChange: (values: string[], key: string) => void
  onDateSelectChange: (value: [number, number]) => void
}

export default function Index({ filters, onChipsChange, onDateSelectChange }: FilterBoxProps) {
  const chipGroupList = useMemo(() => {
    return (
      <>
        <ChipGroups
          label={"星级"}
          tags={rate}
          values={filters.chipGroup["rate"]}
          onChange={(values) => onChipsChange(values, "rate")}
        />
        <ChipGroups
          label={"职业"}
          tags={profession}
          values={filters.chipGroup["profession"]}
          onChange={(values) => onChipsChange(values, "profession")}
        />
        <ChipGroups
          label={"获取渠道"}
          tags={accessChannel}
          values={filters.chipGroup["accessChannel"]}
          onChange={(values) => onChipsChange(values, "accessChannel")}
        />
        <ChipGroups
          label={"性别"}
          tags={sex}
          values={filters.chipGroup["sex"]}
          onChange={(values) => onChipsChange(values, "sex")}
        />
        <ChipGroups
          label={"部署位"}
          tags={deployment}
          values={filters.chipGroup["deployment"]}
          onChange={(values) => onChipsChange(values, "deployment")}
        /></>)
  }, [filters.chipGroup, onChipsChange])

  return (
    <Box
      sx={{
        boxShadow: "0 1px 2px 2px #eee",
        borderRadius: "20px",
        height: "590px",
        padding: "0 10px",
        overflow: "hidden",
      }}
    >
      <DateSelect
        value={filters["dateRange"]} label={"干员实装时间"} onChange={onDateSelectChange} />
      {chipGroupList}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button variant="outline" color="dark" radius="xl">
          重置为全部干员
        </Button>
        <Box sx={{ width: "10px" }}></Box>
        <Button variant="outline" radius="xl">
          收起筛选面板
        </Button>
      </Box>
    </Box>)
}