import React from "react";
import { StyleSheet, View, Image } from "react-native";
import backDark from "../assets/icons/back-dark.png";
import backLight from "../assets/icons/back-light.png";
import editDark from "../assets/icons/edit-dark.png";
import editLight from "../assets/icons/edit-light.png";
import lockDark from "../assets/icons/lock-dark.png";
import lockLight from "../assets/icons/lock-light.png";
import newDark from "../assets/icons/new-dark.png";
import newLight from "../assets/icons/new-light.png";
import optionsDark from "../assets/icons/options-dark.png";
import optionsLight from "../assets/icons/options-light.png";
import saveDark from "../assets/icons/save-dark.png";
import saveLight from "../assets/icons/save-light.png";
import searchDark from "../assets/icons/search-dark.png";
import searchLight from "../assets/icons/search-light.png";
import sendDark from "../assets/icons/send-dark.png";
import sendLight from "../assets/icons/send-light.png";

const Icons = {
  back: {
    dark: backDark,
    light: backLight,
  },
  edit: {
    dark: editDark,
    light: editLight,
  },
  lock: {
    dark: lockDark,
    light: lockLight,
  },
  new: {
    dark: newDark,
    light: newLight,
  },
  options: {
    dark: optionsDark,
    light: optionsLight,
  },
  save: {
    dark: saveDark,
    light: saveLight,
  },
  search: {
    dark: searchDark,
    light: searchLight,
  },
  send: {
    dark: sendDark,
    light: sendLight,
  },
};

const Icon = ({ name, color }) => {
  const iconFile = Icons[name][color];

  return (
    <View style={IconStyles.container}>
      <Image style={IconStyles.icon} source={iconFile} />
    </View>
  );
};

const IconStyles = StyleSheet.create({
  container: {
    display: "flex",
  },
  icon: {
    height: 24,
    width: 24,
    margin: "auto",
  },
});

export default Icon;
