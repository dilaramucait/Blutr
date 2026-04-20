import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = createStyles(isDark);

  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] = useState<any>(null);

  // 🌍 Generate stable global data
  const generateRandomLocations = (count = 80) => {
    const risks = ["low", "medium", "high"];

    return Array.from({ length: count }).map((_, i) => {
      const risk = risks[Math.floor(Math.random() * risks.length)];

      return {
        id: i,
        name: `Location ${i + 1}`,
        latitude: Math.random() * 140 - 70,
        longitude: Math.random() * 360 - 180,
        risk,
        score:
          risk === "high"
            ? Math.floor(Math.random() * 40 + 60)
            : risk === "medium"
              ? Math.floor(Math.random() * 30 + 30)
              : Math.floor(Math.random() * 30),
        type: "water body",
      };
    });
  };

  const [locations] = useState(generateRandomLocations());

  // 🎨 Color logic
  const getColor = (risk: string) => {
    if (risk === "high") return "red";
    if (risk === "medium") return "orange";
    return "green";
  };

  // 🔍 Safe zoom (fixed TypeScript issue)
  const zoom = (factor: number) => {
    mapRef.current?.getCamera().then((cam) => {
      const currentZoom = cam.zoom ?? 10;
      const newZoom = Math.max(2, Math.min(currentZoom + factor, 20));

      mapRef.current?.animateCamera({
        ...cam,
        zoom: newZoom,
      });
    });
  };

  return (
    <View style={styles.container}>
      {/* MAP */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 20,
          longitude: 0,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude,
            }}
            pinColor={getColor(loc.risk)}
            onPress={() => setSelected(loc)}
          />
        ))}
      </MapView>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
          style={styles.input}
        />
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>YN</Text>
        </View>
      </View>

      {/* ZOOM BUTTONS */}
      <View style={styles.zoom}>
        <TouchableOpacity style={styles.zoomBtn} onPress={() => zoom(1)}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.zoomBtn} onPress={() => zoom(-1)}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* ALERT */}
      <View style={styles.alert}>
        <Text style={styles.alertTitle}>
          AI alert — Global pollution hotspots detected
        </Text>
        <Text style={styles.alertText}>Data simulated for demo purposes.</Text>
      </View>

      {/* BOTTOM SHEET */}
      <View style={styles.bottomSheet}>
        <Text style={styles.sheetTitle}>
          {selected ? selected.name : "Overview"}
        </Text>

        {selected ? (
          <>
            <Text style={styles.itemText}>
              Risk: {selected.risk.toUpperCase()}
            </Text>
            <Text style={styles.itemText}>
              Pollution score: {selected.score}
            </Text>
            <Text style={styles.itemText}>Type: {selected.type}</Text>
          </>
        ) : (
          locations.slice(0, 5).map((loc) => (
            <TouchableOpacity
              key={loc.id}
              style={styles.item}
              onPress={() => {
                setSelected(loc);
                mapRef.current?.animateToRegion({
                  latitude: loc.latitude,
                  longitude: loc.longitude,
                  latitudeDelta: 10,
                  longitudeDelta: 10,
                });
              }}
            >
              <Text style={styles.itemText}>
                {getColor(loc.risk) === "red"
                  ? "🔴"
                  : getColor(loc.risk) === "orange"
                    ? "🟠"
                    : "🟢"}{" "}
                {loc.name} — {loc.score}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: { flex: 1 },

    searchBar: {
      position: "absolute",
      top: 50,
      left: 16,
      right: 16,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? "#0f172a" : "white",
      padding: 10,
      borderRadius: 25,
    },

    input: {
      flex: 1,
      color: isDark ? "white" : "black",
    },

    avatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#2563eb",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
    },

    avatarText: {
      color: "white",
      fontWeight: "bold",
    },

    zoom: {
      position: "absolute",
      right: 16,
      top: 200,
      gap: 10,
    },

    zoomBtn: {
      width: 40,
      height: 40,
      backgroundColor: isDark ? "#0f172a" : "white",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },

    zoomText: {
      color: isDark ? "white" : "black",
      fontSize: 18,
      fontWeight: "bold",
    },

    alert: {
      position: "absolute",
      top: 130,
      left: 16,
      right: 16,
      backgroundColor: isDark ? "#1e293b" : "#dbeafe",
      padding: 12,
      borderRadius: 12,
    },

    alertTitle: {
      fontWeight: "bold",
      color: isDark ? "white" : "black",
    },

    alertText: {
      marginTop: 4,
      color: isDark ? "#94a3b8" : "#475569",
    },

    bottomSheet: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: isDark ? "#0f172a" : "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
    },

    sheetTitle: {
      fontWeight: "bold",
      color: isDark ? "white" : "black",
      marginBottom: 10,
    },

    item: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: isDark ? "#1e293b" : "#eee",
    },

    itemText: {
      color: isDark ? "white" : "black",
    },
  });
