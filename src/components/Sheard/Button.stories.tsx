// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import type { Story } from "@storybook/react";
import type { Meta } from "@storybook/react/types-6-0";

import type { CommonButtonType } from "./Button";
import { CommonButton } from "./Button";

export default {
  title: "Example/Button",
  component: CommonButton,
} as Meta;

const Template: Story<CommonButtonType> = (args) => {
  return (
    <CommonButton {...args} button>
      {args.children}
    </CommonButton>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  children: "送信",
  bgColor: "blue",
  size: "medium",
};
