import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Typography,
  TypographyProps,
  CircularProgress,
} from '@mui/material';
import React from 'react';

interface ButtonProps extends MuiButtonProps {
  label?: string;
  backgroundColor?: string;
  labelVariant?: TypographyProps['variant'];
  labelSx?: React.CSSProperties;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  color = 'text.secondary',
  backgroundColor = 'primary.main',
  variant = 'contained',
  labelVariant,
  sx,
  labelSx,
  loading,
  disabled,
  ...rest
}) => {
  return (
    <MuiButton
      disabled={disabled || loading}
      variant={variant}
      sx={{
        ...{
          backgroundColor: variant === 'outlined' ? 'transparent' : backgroundColor,
          border: variant === 'outlined' ? '1px solid #07E0E0' : 'none',
          padding: '8px 20px',
          width: '100%',
          transition: 'all .3s ease',
          cursor: 'pointer',
          // borderRadius: '4px',
          borderRadius: '100px',
          '&:hover': {
            backgroundColor: variant === 'outlined' ? 'transparent' : backgroundColor,
            opacity: 0.9,
          },
          '&.Mui-disabled': {
            backgroundColor: '#E0E0E0',
          },
          ...sx,
        },
      }}
      {...rest}
    >
      <Typography
        variant={labelVariant}
        color={variant === 'outlined' ? 'primary' : color}
        sx={{ ...(labelVariant ? {} : { fontSize: '16px', fontWeight: '500', lineHeight: '27px' }), ...labelSx }}
      >
        {label}
      </Typography>
      {loading && <CircularProgress size={24} />}
    </MuiButton>
  );
};

export default Button;
