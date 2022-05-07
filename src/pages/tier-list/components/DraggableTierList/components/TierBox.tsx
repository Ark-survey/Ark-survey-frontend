import { ActionIcon, Box } from "@mantine/core";
import { useCallback, useState } from "react";
import DeleteTier from "./DeleteTierPopover";
import EditTierPopover from "./EditTierPopover";

/**
 * @param value tier value
 */

interface TierBoxProps {
  value: number;
  operationDisplay?: boolean;
}

export default function TierBox({
  value,
  operationDisplay = false,
}: TierBoxProps) {
  const [hovering, setHovering] = useState(false);
  const handleMouseEnter = useCallback(() => {
    setHovering(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHovering(false);
  }, []);

  return (
    <>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "calc(100% = 20px)",
          border: "2px #ccc solid",
          borderRadius: "20px",
          minHeight: "110px",
          position: "relative",
          margin: "0 10px",
          marginBottom: "20px",
          marginTop: "5px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
          {"T " + value}
        </Box>
        {operationDisplay && (
          <Box
            sx={{
              position: "absolute",
              top: "30px",
              left: "-10px",
            }}
          >
            <EditTierPopover />
            <Box sx={{ height: "5px" }} />
            <DeleteTier />
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            fontSize: "80px",
            left: "20px",
            lineHeight: "110px",
            fontWeight: 900,
            WebkitTextStroke: "2px #eee",
            WebkitTextFillColor: "transparent",
          }}
        >
          {"Tier " + value}
        </Box>
      </Box>
    </>
  );
}
