import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../app/resource/colors";

type Props = TextInputProps;

class FormTextInput extends React.Component<Props> {
  render() {
    const { style, ...otherProps } = this.props;
    return (
      <TextInput
        selectionColor={colors.DODGER_BLUE}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: colors.SILVER,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10
  }
});

export default FormTextInput;