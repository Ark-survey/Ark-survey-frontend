import { Box, Button } from "@mantine/core";
import Header from "src/components/Header";

import { delOptByTier, addOptByTier } from 'src/store/slice/tierSlice';
import { updateOptPicked, updateOptSelecting } from 'src/store/slice/optSlice';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";

import {
  OptDragItem, OptListItemType,
} from "../../OptListBox/components/OptListItem";
import AddTierPopover from "./components/AddTierPopover";
import ResetAllOptPopover from "./components/ResetAllOptPopover";
import TierBox from "./components/TierBox";
import UploadPopover from "./components/UploadPopover";
import { useRef, useState } from "react";
// import html2canvas from "html2canvas";
// import { format } from "date-fns";

export default function Index() {
  const tiers = useSelector((state: RootState) => state.userTierList.tierList);
  const opts = useSelector((state: RootState) => state.opts);
  const dispatch = useDispatch();
  const tiersBox = useRef<HTMLDivElement>(null);

  const [makingImg] = useState(false)

  const handleDropOptOnTier = ({ opt, type, fromTierValue }: OptDragItem, toTierValue: number) => {
    console.log(type === OptListItemType.TIER && fromTierValue !== toTierValue);

    if (type === OptListItemType.NORMAL || (type === OptListItemType.TIER && fromTierValue !== toTierValue)) {
      const index = opts.findIndex((o: any) => o.id === opt.id)
      dispatch(updateOptPicked({ optIndex: index, value: true }))
      dispatch(updateOptSelecting({ optIndex: index, value: false }))

      if (type === OptListItemType.TIER) {
        dispatch(
          delOptByTier({
            tierValue: fromTierValue ?? 0,
            optId: opt.id
          }
          ))
      }

      dispatch(
        addOptByTier({
          tierValue: toTierValue,
          optId: opt.id
        })
      )
    }
  };

  // const makeTierImg = () => {
  //   setMakingImg(true)
  //   setTimeout(() => {
  //     if (tiersBox.current) {
  //         html2canvas(tiersBox.current, {
  //           allowTaint: true
  //         }).then((canvas) => {
  //           var a = document.createElement("a");
  //           a.href = canvas.toDataURL("image/png");
  //           a.download = '等级表 ' + format(new Date().getTime(),'yy-MM-dd hh-mm-ss');
  //           a.click();
  //         });
  //     }
  //     setMakingImg(false)
  //   })
  // }

  return (
    <Box
      sx={{
        flex: '1.5',
        width: "100%",
        boxShadow: "0 0 5px 5px #eee",
        borderRadius: "20px",
        maxHeight: "890px",
        overflow: 'hidden',
        userSelect: "none",
        minWidth: "326px",
      }}>
      <Header title="等级表编辑">
        <ResetAllOptPopover />
        <Box sx={{ width: "10px" }}></Box>
        <AddTierPopover />
        <Box sx={{ width: "10px" }}></Box>
        <Button disabled size='xs' variant="outline" color="blue" radius="xl" /* onClick={makeTierImg} */>
          截图
        </Button>
        <Box sx={{ width: "10px" }}></Box>
        <UploadPopover />
      </Header>
      <Box
        sx={{
          overflow: "auto",
          height: "calc(100% - 100px)",
          "::-webkit-scrollbar": { width: "0 !important" },
        }}>
        <Box
          ref={tiersBox}
          sx={{
            overflow: "auto",
            marginTop: '2px',
          }}
        >
          <Box
            sx={{
              margin: "15px",
            }}
          >
            {tiers.map((tier) => (
              <TierBox
                key={tier.value}
                tier={tier}
                onDropOpt={(item) => handleDropOptOnTier(item, tier.value)}
                operationDisplay={!makingImg}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: "15px" }}></Box>
    </Box>
  );
}
