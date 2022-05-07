import { Box, Image, createStyles, RangeSlider, Button } from "@mantine/core";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { API } from "src/api";
import { Profession, AccessChannel, Deployment, Sex, Rate } from "src/contexts";
import useSWR from "swr";
import { ChipGroups } from "./components/ChipGroups";
import { DateSelect } from "./components/DateSelect";
import DraggableTierList from "./components/DraggableTierList";
import OptList from "./OptList";

const useStyles = createStyles((theme, _params, getRef) => ({
  iconWrapper: {
    ref: getRef("iconWrapper"),
  },

  checked: {
    backgroundColor: `${theme.colors.blue[6]} !important`,
    color: theme.white,

    [`& .${getRef("iconWrapper")}`]: {
      color: theme.white,
    },
  },
}));

export default function Index() {
  // const { data, error } = useSWR(API.charList.get);

  const [filters, setFilters] = useState<{ [x: string]: string[] }>({
    opRate: [],
    profession: [],
    sex: [],
    rate: [],
    deployment: [],
    accessChannel: [],
    timeRange: [],
  });

  const { classes } = useStyles();

  const handleChipsChange = useCallback(
    (values: string[], groupName: string) => {
      setFilters((state) => {
        state[groupName] = values;
        return {
          ...state,
        };
      });
    },
    []
  );

  const filterOpen = useMemo(() => {
    let flag = false;
    for (let f in filters) {
      if (filters[f].length !== 0) flag = true;
    }
    return flag;
  }, [filters]);

  return (
    <Box
      sx={{
        maxWidth: "1210px",
        display: "flex",
        margin: "0 auto",
        marginTop: "100px",
      }}
    >
      <Box
        sx={{
          width: "480px",
          boxShadow: "0 0 5px 5px #eee",
          borderRadius: "20px",
          userSelect: "none",
        }}
      >
        <Box
          sx={{
            boxShadow: "0 1px 2px 2px #eee",
            borderRadius: "20px",
            height: "590px",
            padding: "0 10px",
            overflow: "hidden",
          }}
        >
          <DateSelect label={"干员实装时间"} />
          <ChipGroups
            label={"星级"}
            tags={Rate}
            classNames={classes}
            onChange={(values) => handleChipsChange(values, "rate")}
          />
          <ChipGroups
            label={"职业"}
            tags={Profession}
            classNames={classes}
            onChange={(values) => handleChipsChange(values, "profession")}
          />
          <ChipGroups
            label={"获取渠道"}
            tags={AccessChannel}
            classNames={classes}
            onChange={(values) => handleChipsChange(values, "accessChannel")}
          />
          <ChipGroups
            label={"性别"}
            tags={Sex}
            classNames={classes}
            onChange={(values) => handleChipsChange(values, "sex")}
          />
          <ChipGroups
            label={"部署位"}
            tags={Deployment}
            classNames={classes}
            onChange={(values) => handleChipsChange(values, "deployment")}
          />
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
        </Box>
        <Box
          sx={{
            height: "365px",
            overflow: "auto",
            padding: "10px",
            paddingBottom: "0",
            "::-webkit-scrollbar": { width: "0 !important" },
          }}
        >
          <OptList filters={filters} filterOpen={filterOpen} />
        </Box>
        <Box sx={{ width: "100%", height: "15px" }}></Box>
      </Box>
      <Box
        sx={{
          width: "710px",
          boxShadow: "0 0 5px 5px #eee",
          marginLeft: "20px",
          borderRadius: "20px",
          overflow: "hidden",
          maxHeight: "1000px",
          userSelect: "none",
        }}
      >
        <DraggableTierList />
      </Box>
    </Box>
  );
}
