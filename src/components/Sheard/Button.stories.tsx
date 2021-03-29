// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import type { Meta } from "@storybook/react/types-6-0";

import { CommonButton } from "./Button";

export default {
  title: "Example/Button",
  component: CommonButton,
} as Meta;

storiesOf("CommonButton", module).add("button", () => {
  return (
    <CommonButton button onClick={action("click")} bgColor="blue">
      Hello
    </CommonButton>
  );
});
