import { LoadingButton } from "@mui/lab";
import { Button, ButtonProps, Typography, TypographyProps } from "@mui/material";
import React from "react";

interface PrimaryButtonProps extends ButtonProps {
  children: any;
  isLoading?: boolean;
}

const PrimaryLoadingButton: React.FC<PrimaryButtonProps> = ({
  children,
  variant = "contained",
  sx,
  isLoading = false,
  ...rest
}) => {
  return (
    <LoadingButton
      variant={variant}
      loading={isLoading}
      sx={{
        background: variant === "outlined" ? "transparent" : "linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%)",
        boxShadow: '0px 2px 5px rgba(234, 177, 63, 0.44)',
        border: variant === "outlined" ? "1px solid #07E0E0" : "none",
        padding: "5px",
        width: "100%",
        transition: "all .3s ease",
        cursor: "pointer",
        borderRadius: "100px",
        "&:hover": {
          background: variant === "outlined" ? "transparent" : "linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%)",
          opacity: 0.9,
        },
        ...sx,
      }}
      {...rest}
    >
      {isLoading ? null : children}
    </LoadingButton>
  );
};

export default PrimaryLoadingButton;