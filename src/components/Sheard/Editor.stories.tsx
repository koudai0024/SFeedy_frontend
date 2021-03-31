// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import type { Story } from "@storybook/react";
import type { Meta } from "@storybook/react/types-6-0";
import { useState } from "react";

import type { EditorProps } from "./Editor";
import { Editor } from "./Editor";

export default {
  title: "Example/Editor",
  component: Editor,
} as Meta;

const Template: Story<EditorProps> = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  return (
    <Editor
      test={true}
      title={title}
      setTitle={setTitle}
      body={body}
      setBody={setBody}
      tags={tags}
      setTags={setTags}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {};
