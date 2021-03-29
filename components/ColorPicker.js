import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";

const options = [
  colors.limeAccent,
  colors.bluePrimary,
  colors.tealSecondary,
  colors.redError,
  colors.light,
];

const ColorPicker = ({ style, color = colors.limeAccent, handleColor }) => {
  const [selectedColor, setSelectedColor] = useState(color);

  useEffect(() => {
    handleColor(selectedColor);
  }, [selectedColor]);

  return (
    <View style={[ColorPickerStyles.container, style]}>
      <Text
        style={[
          typography.detail,
          { color: colors.limeAccent, marginBottom: 4 },
        ]}
      >
        Color tag
      </Text>
      <ScrollView horizontal>
        <View style={ColorPickerStyles.colorSlider}>
          {options.map((option, index) => (
            <View
              key={`color-${index}`}
              style={ColorPickerStyles.colorContainer}
            >
              {selectedColor === option && (
                <View style={ColorPickerStyles.colorSelector} />
              )}
              <TouchableOpacity
                onPress={() => setSelectedColor(option)}
                style={[
                  ColorPickerStyles.colorOption,
                  { backgroundColor: option },
                ]}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const ColorPickerStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  colorSlider: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 8,
  },
  colorContainer: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
    marginHorizontal: 8,
  },
  colorSelector: {
    position: "absolute",
    height: 48,
    width: 48,
    borderWidth: 1,
    borderColor: colors.limeAccent,
    borderRadius: 200,
  },
  colorOption: {
    height: 32,
    width: 32,
    borderRadius: 200,
  },
});

export default ColorPicker;
