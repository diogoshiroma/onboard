import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../app/resource/colors";

interface Props {
  label: string;
  onPress: () => void;
}

class LoginButton extends React.Component<Props> {
  render() {
    const { label, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.BLACK,
    marginBottom: 12,
    marginTop: 40,

    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)"
  },
  text: {
    color: colors.WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    height: 20
  }
});

export default LoginButton;