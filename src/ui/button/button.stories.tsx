import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonSizes, ButtonVariants } from "./button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    outline: {
      control: { type: "boolean" },
    },
    wide: {
      control: { type: "boolean" },
    },
    size: {
      control: {
        type: "select",
      },
      options: Object.values(ButtonSizes),
    },
    variant: {
      control: {
        type: "select",
      },
      options: Object.values(ButtonVariants),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "This is a button!",
    variant: ButtonVariants.primary,
  },
};

export const Secondary = {
  args: {
    variant: ButtonVariants.secondary,
    children: "This is a button!",
  },
};

export const Large = {
  args: {
    variant: ButtonVariants.default,
    children: "This is a button!",
    size: ButtonSizes.large,
  },
};

export const Normal = {
  args: {
    variant: ButtonVariants.default,
    children: "This is a button!",
    size: ButtonSizes.normal,
  },
};

export const Small = {
  args: {
    variant: ButtonVariants.default,
    children: "This is a button!",
    size: ButtonSizes.small,
  },
};

export const Outline = {
  args: {
    variant: ButtonVariants.default,
    children: "This is a button!",
    outline: true,
  },
};

export const Wide = {
  args: {
    variant: ButtonVariants.default,
    children: "This is a button!",
    wide: true,
  },
};
