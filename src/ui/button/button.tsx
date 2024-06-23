import type { FC, ButtonHTMLAttributes } from "react";
import cn from "clsx";

export enum ButtonVariants {
  default = "default",
  neutral = "neutral",
  primary = "primary",
  secondary = "secondary",
  accent = "accent",
  ghost = "ghost",
  link = "link",
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

export enum ButtonSizes {
  large = "large",
  normal = "normal",
  small = "small",
  tiny = "tiny",
}

export interface ButtonProps {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  outline?: boolean;
  wide?: boolean;
}

const variantClass: Record<ButtonVariants, string> = {
  [ButtonVariants.default]: "",
  [ButtonVariants.neutral]: "btn-neutral",
  [ButtonVariants.primary]: "btn-primary",
  [ButtonVariants.secondary]: "btn-secondary",
  [ButtonVariants.link]: "btn-link",
  [ButtonVariants.ghost]: "btn-ghost",
  [ButtonVariants.accent]: "btn-accent",
  [ButtonVariants.info]: "btn-info",
  [ButtonVariants.success]: "btn-success",
  [ButtonVariants.warning]: "btn-warning",
  [ButtonVariants.error]: "btn-error",
};

const sizeClass: Record<ButtonSizes, string> = {
  [ButtonSizes.normal]: "",
  [ButtonSizes.large]: "btn-lg",
  [ButtonSizes.small]: "btn-sm",
  [ButtonSizes.tiny]: "btn-xs",
};

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  variant = ButtonVariants.primary,
  size = ButtonSizes.normal,
  outline = false,
  wide = false,
  ...props
}) => {
  const rootClassName = cn(
    "btn",
    variantClass[variant],
    sizeClass[size],
    { "btn-outline": outline },
    { "btn-wide": wide },
    className
  );

  return (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
