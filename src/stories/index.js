import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withNotes } from "@storybook/addon-notes";
import { linkTo } from "@storybook/addon-links";
import { withInfo, setDefaults } from "@storybook/addon-info";

import Button from "../module-common/Button";
import TextArea from "../module-common/TextArea";
import NotesInput from "../module-input/NotesInput";

// addon-info
setDefaults({
  header: false, // Toggles display of header with component name and description
  inline: false, // Displays info inline vs click button to view
  source: true
});

const styles = {
  textAlign: "center",
  marginTop: 100
};
const Center = ({ children }) => <div style={styles}>{children}</div>;

storiesOf("Atoms/Button", module)
  // .addDecorator(story => (
  //   <div style={{ textAlign: "center", marginTop: 50 }}>{story()}</div>
  // ))
  .add(
    "Basic",
    withInfo(`
        description or documentation about my component, supports markdown
      
        ~~~js
        <Button>Click Here</Button>
        ~~~
      
      `)(() => (
      <Center>
        <Button text="SAVE" onClick={linkTo("Atoms/Text Area", "Default")} />
      </Center>
    ))
  )
  .add(
    "Size",
    withInfo({
      styles: {
        header: {
          h1: {
            color: "red"
          }
        }
      },
      text: "Button with different size"
    })(() => (
      <Center>
        <Button
          text="SAVE"
          size="small"
          color="primary"
          onClick={() => alert("button is clicked")}
        />
        <Button
          text="SAVE"
          size="medium"
          color="primary"
          onClick={() => alert("button is clicked")}
        />
        <Button
          text="SAVE"
          size="large"
          color="primary"
          onClick={() => alert("button is clicked")}
        />
      </Center>
    ))
  )
  .add(
    "Color",
    withInfo({
      styles: {
        header: {
          h1: {
            color: "red"
          }
        }
      },
      text: "Button with different size"
    })(() => (
      <Center>
        <Button
          text="SAVE"
          size="medium"
          color="primary"
          onClick={() => alert("button is clicked")}
        />
        <Button
          text="SAVE"
          size="medium"
          color="secondary"
          onClick={() => alert("button is clicked")}
        />
        <Button
          text="SAVE"
          size="medium"
          color="success"
          onClick={() => alert("button is clicked")}
        />
        <Button
          text="SAVE"
          size="medium"
          color="warning"
          onClick={() => alert("button is clicked")}
        />
        <Button
          text="SAVE"
          size="medium"
          color="danger"
          onClick={() => alert("button is clicked")}
        />
        <Button
          text="SAVE"
          size="medium"
          color="transparent"
          onClick={() => alert("button is clicked")}
        />
      </Center>
    ))
  );

storiesOf("Atoms/Text Area", module).add("Default", () => (
  <TextArea
    placeholder="What's on your mind ?"
    // value={value}
    // onClick={() => this.handleAddNote()}
    // onChange={text => this.onChangeInput(text)}
  />
));

storiesOf("Molecules", module).add("Single Input Form", () => (
  <NotesInput
    name="James"
    // callbackInput={input => this.onAddNew(input)}
    // onEdit={onEdit}
    // dataEdit={dataEdit}
  />
));
