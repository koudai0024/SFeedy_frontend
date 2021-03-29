// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { storiesOf } from "@storybook/react";
import type { Meta } from "@storybook/react/types-6-0";

import { MainHeading } from "./Typography";

export default {
  title: "Example/Title",
  component: MainHeading,
} as Meta;

storiesOf("MainHeading", module)
  .add("h1", () => {
    return <MainHeading variant="h1">Hello h1</MainHeading>;
  })
  .add("color change", () => {
    return (
      <MainHeading variant="h1" className="text-red-500">
        Hello H2
      </MainHeading>
    );
  })
  .add("not Children", () => {
    return <MainHeading variant="h1"></MainHeading>;
  });
