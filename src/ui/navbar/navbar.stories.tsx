import React from "react";
import type { FC, HTMLAttributes } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "./navbar";

const meta: Meta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
};

export default meta;

type Story = StoryObj<typeof Navbar>;

const EndExample: FC<HTMLAttributes<HTMLDivElement>> = () => <>sheeesh</>;

export const Default: Story = {
  args: {
    title: "Penalty",
    endContent: <EndExample />,
  },
};
