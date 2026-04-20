import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  const [wasteType, setWasteType] = useState("Plastic");
  const [severity, setSeverity] = useState("High");

  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();

  const colors = {
    border: isDark ? "#3a3a3c" : "#ccc",
    softBlue: isDark ? "#1f2a44" : "#f5f9ff",
    softGreen: isDark ? "#12301f" : "#e9f7ee",
    softLocation: isDark ? "#1a2333" : "#f1f6ff",
    textMuted: isDark ? "#aaa" : "#666",
    primary: "#2b6fff",
    text: isDark ? "#ffffff" : "#000000",
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 30 },
      ]}
    >
      {/* TITLE */}
      <ThemedText
        type="title"
        style={{
          fontFamily: Fonts.rounded,
          color: colors.text,
          marginBottom: 12,
        }}
      >
        Report Pollution
      </ThemedText>

      {/* UPLOAD */}
      <TouchableOpacity
        style={[
          styles.uploadBox,
          {
            backgroundColor: colors.softBlue,
            borderColor: colors.border,
          },
        ]}
      >
        <IconSymbol name="camera.fill" size={28} color={colors.primary} />
        <ThemedText style={{ marginTop: 8, color: colors.textMuted }}>
          Tap to upload photo
        </ThemedText>
      </TouchableOpacity>

      {/* AI RESULT */}
      <ThemedView
        style={[styles.aiCard, { backgroundColor: colors.softGreen }]}
      >
        <ThemedText style={{ fontWeight: "600", color: "#1f7a3a" }}>
          AI detected: Plastic debris
        </ThemedText>
        <ThemedText style={{ fontSize: 12, color: colors.textMuted }}>
          Density: high • Risk score: 82 • Confidence: 94%
        </ThemedText>
      </ThemedView>

      {/* WASTE TYPE */}
      <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
        Waste type
      </ThemedText>

      <ThemedView style={styles.row}>
        {["Plastic", "Chemical", "Organic", "Construction"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setWasteType(type)}
            style={[
              styles.chip,
              {
                borderColor: colors.border,
                backgroundColor:
                  wasteType === type ? colors.primary : "transparent",
              },
            ]}
          >
            <ThemedText
              style={{
                fontSize: 12,
                color: wasteType === type ? "white" : colors.text,
              }}
            >
              {type}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* SEVERITY */}
      <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
        Severity
      </ThemedText>

      <ThemedView style={styles.row}>
        {["Low", "Medium", "High"].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setSeverity(level)}
            style={[
              styles.chip,
              {
                borderColor: colors.border,
                backgroundColor:
                  severity === level ? colors.primary : "transparent",
              },
            ]}
          >
            <ThemedText
              style={{
                fontSize: 12,
                color: severity === level ? "white" : colors.text,
              }}
            >
              {level}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* LOCATION */}
      <ThemedView
        style={[styles.locationBox, { backgroundColor: colors.softLocation }]}
      >
        <IconSymbol name="location.fill" size={18} color={colors.primary} />
        <ThemedText style={{ flex: 1, color: colors.text }}>
          Vardar riverbank • 41.9961° N, 21.4316° E
        </ThemedText>
      </ThemedView>

      {/* SUBMIT */}
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: colors.primary }]}
      >
        <ThemedText style={{ color: "white", fontWeight: "600" }}>
          Submit report
        </ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  uploadBox: {
    height: 140,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  aiCard: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
  },

  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },

  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
  },

  submitButton: {
    marginTop: 24,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
});
