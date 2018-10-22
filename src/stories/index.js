import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withNotes } from "@storybook/addon-notes";
import { linkTo } from "@storybook/addon-links";
import { withInfo, setDefaults } from "@storybook/addon-info";

import Button from "../module-common/Button";
import TextArea from "../module-common/TextArea";
import NotesInput from "../module-input/NotesInput";
import { width } from "window-size";

setDefaults({
  header: false, // Toggles display of header with component name and description
  inline: false, // Displays info inline vs click button to view
  source: true
});

const styles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  width: "100%",
  height: "100%"
};

const Center = ({ children }) => <div style={styles}>{children}</div>;

storiesOf("Atoms/Button", module)
  .add(
    "Default",
    withInfo(`

        # Default Button
        #### Must pass a props text={string}
      
      `)(() => (
      <Center>
        <Button text="SAVE" onClick={linkTo("Atoms/Text Area", "Default")} />
      </Center>
    ))
  )
  .add(
    "Size",
    withInfo(`

    # Size Button
    #### Must pass a props size={string}
  
  `)(() => (
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
    withInfo(`

    # Color Button
    #### Must pass a props color={string}
  
  `)(() => (
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

storiesOf("Atoms/Text Area", module).add(
  "Default",
  withInfo(`

      # Default Text Area
      #### Must pass a placeholder placeholder={string}

    `)(() => (
    <Center>
      <TextArea placeholder="What's on your mind ?" />
    </Center>
  ))
);

storiesOf("Molecules", module).add(
  "Text Area Form",
  withInfo(`

      # Default Text Area Form
      #### Must pass a placeholder placeholder={string}

    `)(() => <NotesInput />)
);
