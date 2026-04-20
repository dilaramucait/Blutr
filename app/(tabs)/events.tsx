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

function EventCard({
  title,
  time,
  participants,
  risk,
  buttonText,
  active = false,
}: any) {
  const isDark = useColorScheme() === "dark";

  const colors = {
    border: isDark ? "#3a3a3c" : "#ddd",
    card: active
      ? isDark
        ? "#12301f"
        : "#e9f7ee"
      : isDark
        ? "#1c1c1e"
        : "#fff",
    text: isDark ? "#fff" : "#000",
    muted: isDark ? "#aaa" : "#666",
    primary: "#2b6fff",
    green: "#28a745",
  };

  return (
    <ThemedView
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <ThemedView style={styles.row}>
        <ThemedText style={[styles.cardTitle, { color: colors.text }]}>
          {title}
        </ThemedText>

        {active && (
          <ThemedText style={{ color: colors.green, fontWeight: "600" }}>
            Active
          </ThemedText>
        )}
      </ThemedView>

      <ThemedText style={{ color: colors.muted, fontSize: 13 }}>
        {time}
      </ThemedText>

      <ThemedView style={styles.tags}>
        <ThemedText style={styles.blueTag}>{participants}</ThemedText>
        <ThemedText style={risk === "High" ? styles.redTag : styles.orangeTag}>
          {risk} risk
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.progressBackground}>
        <ThemedView style={styles.progressFill} />
      </ThemedView>

      <TouchableOpacity
        style={[
          styles.joinButton,
          { backgroundColor: active ? colors.green : colors.primary },
        ]}
      >
        <ThemedText style={{ color: "white", fontWeight: "600" }}>
          {buttonText}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";

  const colors = {
    header: "#2b6fff",
    alertBg: isDark ? "#3a2a1a" : "#fff4e5",
    alertText: "#d97706",
    text: isDark ? "#fff" : "#000",
    muted: isDark ? "#aaa" : "#666",
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 20 },
      ]}
    >
      <ThemedText
        type="title"
        style={{
          fontFamily: Fonts.rounded,
          color: colors.text,
          marginBottom: 4,
        }}
      >
        Cleanup events
      </ThemedText>

      <ThemedText style={{ color: colors.muted, marginBottom: 18 }}>
        3 events near you • Smart routing active
      </ThemedText>

      <ThemedView
        style={[styles.alertBox, { backgroundColor: colors.alertBg }]}
      >
        <IconSymbol name="sparkles" size={18} color={colors.alertText} />
        <ThemedText style={{ color: colors.alertText, flex: 1 }}>
          Matched for Vardar North — 380m away
        </ThemedText>
      </ThemedView>

      <EventCard
        title="Vardar North cleanup"
        time="Today • 9:00 AM • 380m away"
        participants="9/10 joined"
        risk="High"
        buttonText="Join — starts in 22 min"
        active
      />

      <EventCard
        title="Ohrid inlet survey"
        time="Tomorrow • 10:00 AM • 0.8km away"
        participants="4/10 joined"
        risk="Medium"
        buttonText="Join event"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },

  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  tags: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },

  blueTag: {
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },

  redTag: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },

  orangeTag: {
    backgroundColor: "#ffedd5",
    color: "#ea580c",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },

  progressBackground: {
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginTop: 12,
  },

  progressFill: {
    width: "70%",
    height: 6,
    backgroundColor: "#2b6fff",
    borderRadius: 10,
  },

  joinButton: {
    marginTop: 14,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
});
