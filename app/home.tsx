import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View, StyleSheet
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';


declare global {
  namespace ReactNavigation {
  }
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { width } = Dimensions.get("window");

const QUICK_ACTIONS = [
  { 
    icon: "add-circle-outline" as const,
    label: "Add\nMedication",
    route: "./medication/add" as const,
    color: "#6B4CCF",
    gradient: ["#7B5CF4", "#6B4CCF"] as [string, string],
   },
   {
  icon: "calendar-outline" as const,
  label: "Calendar\nView",
  route: "./calendar" as const,
  color: "#1976D2",
  gradient: ["#2196F3", "#1976D2"] as [string, string],
},
{
  icon: "time-outline" as const,
  label: "History\nLog",
  route: "./history" as const,
  color: "#C2185B",
  gradient: ["#E91E63", "#C2185B"] as [string, string],
},
{
  icon: "medical-outline" as const,
  label: "Refill\nTracker",
  route: "./refills" as const,
  color: "#E64A19",
  gradient: ["#FF5722", "#E64A19"] as [string, string],
},
];  

interface CircularProgressProps {
  progress: number;
  totalDoses: number;
  completedDoses: number;
}

function CircularProgress({
  progress,
  totalDoses,
  completedDoses,
}: CircularProgressProps) {
  const animationValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.55;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress, animationValue]); // FIXED: Added missing dependency

  const strokeDashoffset = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.progressContainer}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
       <AnimatedCircle
  cx={size / 2}
  cy={size / 2}
  r={radius}
  stroke="#6B4CCF"
  strokeWidth={18}
  fill="none"
  strokeDasharray={circumference}
  strokeDashoffset={strokeDashoffset}
  strokeLinecap="round"
/>
      </Svg>
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Text style={styles.progressPercentage}>
          {Math.round(progress * 100)}%
        </Text>
        <Text style={styles.progressLabel}>
          {completedDoses} of {totalDoses} doses
        </Text>
      </View>
    </View>
  );
}

function HomeScreen() {
  const navigation = useNavigation();
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={["#7B5CF4", "#6B4CCF"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>Daily progress</Text>
            </View>

            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>1</Text>
            </View>
          </View>

          <View>
            <CircularProgress
              progress={0.5}
              totalDoses={10}
              completedDoses={5}
            />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
          {QUICK_ACTIONS.map((actions) => (
<TouchableOpacity 
  key={actions.label} 
  style={styles.actionButton}
  onPress={() => {
    if (actions.label === "Add\nMedication") {
      (navigation as any).navigate("medication");
    }
  }}
>               
                <LinearGradient colors={actions.gradient} style={styles.actionGradient} >
                  <View style={styles.actionContent}>
                    <View style={styles.actionIcon}>
                      <Ionicons name={actions.icon} size={40} color="white" />
                    </View>
                    <Text style={styles.actionLabel}>{actions.label}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
          ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "#7B5CF4",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  notificationButton: {
    position: "relative",
    top: 20,
    right: 20,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    shadowRadius: 5,  
    marginLeft: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#FF3B30", 
    borderRadius: 10,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,  
    borderWidth: 2,
    borderColor: "white",
    minWidth: 20,
  },
  notificationCount: {
    color: "white",
    fontSize: 11,  
    fontWeight: "bold",
  },
  progressContainer: { 
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  progressTextContainer: {
    position: "relative",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progressPercentage: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
  },
  progressLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "bold",
  },
  progressDetails: {
    fontSize: 11,
    color: "blue",
    fontWeight: "bold", 
  },
  progressRing: {
    transform: [{ rotate: "-90deg" }],
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 15,
  },
  actionButton: {
    width: (width - 52) / 2,
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
  },
  actionGradient: {
    flex: 1,
    padding: 15,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",  
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 5,
  },
  actionContent: {
    flex: 1,
    justifyContent: "space-between",
  }
});

export default HomeScreen;