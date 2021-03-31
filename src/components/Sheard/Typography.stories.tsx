import type { Story } from "@storybook/react";
import type { Meta } from "@storybook/react/types-6-0";

import type { MainHeadingProps } from "./Typography";
import { MainHeading } from "./Typography";

export default {
  title: "Example/Title",
  component: MainHeading,
} as Meta;

const Template: Story<MainHeadingProps> = (args) => {
  return <MainHeading {...args}>{args.children}</MainHeading>;
};

export const Primary = Template.bind({});
Primary.args = {
  children: "Hello",
  variant: "h1",
};
