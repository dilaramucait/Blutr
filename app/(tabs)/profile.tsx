import { useColorScheme } from "@/hooks/use-color-scheme";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = createStyles(isDark);

  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "#94a3b8" : "#475569";

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={[styles.avatarText, { color: textPrimary }]}>YN</Text>
        </View>

        <Text style={[styles.name, { color: textPrimary }]}>Your Name</Text>

        <Text style={[styles.username, { color: textSecondary }]}>
          @name · Skopje
        </Text>

        <View style={styles.role}>
          <Text style={styles.roleText}>River Guardian 🏆</Text>
        </View>
      </View>

      {/* STATS */}
      <View style={styles.statsGrid}>
        <View style={styles.card}>
          <Text style={[styles.statNumber, { color: textPrimary }]}>1,240</Text>
          <Text style={[styles.statLabel, { color: textSecondary }]}>
            Points
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.statNumber, { color: textPrimary }]}>34</Text>
          <Text style={[styles.statLabel, { color: textSecondary }]}>
            Reports
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.statNumber, { color: textPrimary }]}>12</Text>
          <Text style={[styles.statLabel, { color: textSecondary }]}>
            Events
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.statNumber, { color: textPrimary }]}>48 kg</Text>
          <Text style={[styles.statLabel, { color: textSecondary }]}>
            Waste removed
          </Text>
        </View>
      </View>

      {/* BADGES */}
      <Text style={[styles.sectionTitle, { color: textSecondary }]}>
        BADGES EARNED
      </Text>

      <View style={styles.badges}>
        <View style={styles.badge}>
          <Text style={{ color: textPrimary }}>⭐ First report</Text>
        </View>

        <View style={styles.badge}>
          <Text style={{ color: textPrimary }}>🟢 Spotter x10</Text>
        </View>

        <View style={styles.badge}>
          <Text style={{ color: textPrimary }}>✔ Verifier</Text>
        </View>
      </View>

      {/* TRUST SCORE */}
      <View style={styles.trustBox}>
        <Text style={[styles.trustTitle, { color: textSecondary }]}>
          Trust score
        </Text>

        <Text style={[styles.trustValue, { color: textPrimary }]}>
          78 / 100
        </Text>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        <Text style={[styles.trustSub, { color: textSecondary }]}>
          Based on 34 AI-corroborated reports
        </Text>
      </View>

      {/* LEADERBOARD */}
      <Text style={[styles.sectionTitle, { color: textSecondary }]}>
        LEADERBOARD
      </Text>

      <View style={styles.leaderboardCard}>
        <Text style={{ color: textPrimary }}>#1 Your Name1 - 1,890 pts</Text>
      </View>

      <View style={[styles.leaderboardCard, styles.you]}>
        <Text style={{ color: textPrimary }}>
          #2 Your Name2 - 1,240 pts (You)
        </Text>
      </View>

      <View style={styles.leaderboardCard}>
        <Text style={{ color: textPrimary }}>#3 Your Name3 - 1,010 pts</Text>
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? "#020617" : "#ffffff",
    },

    header: {
      alignItems: "center",
      marginTop: 40,
    },

    avatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: isDark ? "#0f172a" : "#e2e8f0",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },

    avatarText: {
      fontWeight: "bold",
    },

    name: {
      fontSize: 20,
      fontWeight: "bold",
    },

    username: {
      marginTop: 3,
    },

    role: {
      marginTop: 10,
      backgroundColor: "#1e40af",
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 20,
    },

    roleText: {
      color: "white",
      fontSize: 12,
    },

    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 20,
    },

    card: {
      width: "48%",
      backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
    },

    statNumber: {
      fontSize: 18,
      fontWeight: "bold",
    },

    statLabel: {
      marginTop: 5,
      fontSize: 12,
    },

    sectionTitle: {
      marginTop: 20,
      marginBottom: 10,
      fontWeight: "bold",
    },

    badges: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    badge: {
      backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
      padding: 10,
      borderRadius: 10,
      flex: 1,
      marginHorizontal: 3,
    },

    trustBox: {
      backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
      padding: 15,
      borderRadius: 12,
      marginTop: 15,
    },

    trustTitle: {},

    trustValue: {
      fontSize: 18,
      marginTop: 5,
    },

    progressBar: {
      height: 6,
      backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
      borderRadius: 5,
      marginTop: 10,
    },

    progressFill: {
      width: "78%",
      height: 6,
      backgroundColor: "#22c55e",
      borderRadius: 5,
    },

    trustSub: {
      fontSize: 11,
      marginTop: 8,
    },

    leaderboardCard: {
      backgroundColor: isDark ? "#0f172a" : "#f1f5f9",
      padding: 12,
      borderRadius: 10,
      marginTop: 8,
    },

    you: {
      borderWidth: 1,
      borderColor: "#3b82f6",
    },
  });
