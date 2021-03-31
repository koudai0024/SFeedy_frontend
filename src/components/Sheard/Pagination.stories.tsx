import type { Story } from "@storybook/react";
import type { Meta } from "@storybook/react/types-6-0";

import type { PaginationProsp } from "./Pagination";
import { Pagination } from "./Pagination";

export default {
  title: "Example/Pagination",
  component: Pagination,
} as Meta;

const Template: Story<PaginationProsp> = (args) => {
  return <Pagination {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  path: "/",
  count: 20,
  currentPage: 1,
};
