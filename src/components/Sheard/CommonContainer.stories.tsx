// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import type { Story } from "@storybook/react";
import type { Meta } from "@storybook/react/types-6-0";

import type { CommonContainerProps } from "./CommonContainer";
import { CommonContainer } from "./CommonContainer";

export default {
  title: "Example/Container",
  component: CommonContainer,
} as Meta;

const Template: Story<CommonContainerProps> = (args) => {
  return <CommonContainer {...args}>{args.children}</CommonContainer>;
};

export const Primary = Template.bind({});
Primary.args = {
  children: "container",
};
