import React from "react";
import { Box } from "@chakra-ui/react";

const sizes = {
  xs: "640px",
  sm: "700px",
  md: "750px",
  lg: "750px",
  huge: "750px",
  max: "750px"
};

/**
 * @param {React.ComponentProps<typeof Box>} props
 */
const Section = ({ size = "md", ...props }) => (
  <Box width="92%" mx="auto" maxW={sizes[size]} {...props} />
);
export default Section;
