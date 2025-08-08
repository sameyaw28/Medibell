import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
const MEDICATION_TYPES = [
  { id: "tablet", label: "Tablet", icon: "medical-outline" },
  { id: "capsule", label: "Capsule", icon: "ellipse-outline" },
  { id: "liquid", label: "Liquid", icon: "water-outline" },
  { id: "injection", label: "Injection", icon: "bandage-outline" },
  { id: "inhaler", label: "Inhaler", icon: "fitness-outline" },
  { id: "cream", label: "Cream", icon: "hand-left-outline" },
];

const FREQUENCY_OPTIONS = [
  { id: "once", label: "Once daily" },
  { id: "twice", label: "Twice daily" },
  { id: "three", label: "3 times daily" },
  { id: "four", label: "4 times daily" },
  { id: "custom", label: "Custom" },
];

export default function AddMedicationScreen() {
    const navigation = useNavigation();
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [notes, setNotes] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSave = () => {
    if (!medicationName.trim()) {
      Alert.alert("Error", "Please enter medication name");
      return;
    }
    if (!dosage.trim()) {
      Alert.alert("Error", "Please enter dosage");
      return;
    }
    if (!selectedType) {
      Alert.alert("Error", "Please select medication type");
      return;
    }
    if (!selectedFrequency) {
      Alert.alert("Error", "Please select frequency");
      return;
    }

    // Here you would save the medication data
    Alert.alert("Success", "Medication added successfully!", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        {/* Header */}
        <LinearGradient colors={["#7B5CF4", "#6B4CCF"]} style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Medication</Text>
            <View style={styles.headerSpacer} />
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Medication Name */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medication Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter medication name"
              value={medicationName}
              onChangeText={setMedicationName}
              placeholderTextColor="#999"
            />
          </View>

          {/* Dosage */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dosage</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 500mg, 1 tablet, 5ml"
              value={dosage}
              onChangeText={setDosage}
              placeholderTextColor="#999"
            />
          </View>

          {/* Medication Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medication Type</Text>
            <View style={styles.typeGrid}>
              {MEDICATION_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeButton,
                    selectedType === type.id && styles.typeButtonSelected
                  ]}
                  onPress={() => setSelectedType(type.id)}
                >
                  <Ionicons 
                    name={type.icon as any}
                    size={24} 
                    color={selectedType === type.id ? "#6B4CCF" : "#666"} 
                  />
                  <Text style={[
                    styles.typeButtonText,
                    selectedType === type.id && styles.typeButtonTextSelected
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Frequency */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequency</Text>
            {FREQUENCY_OPTIONS.map((freq) => (
              <TouchableOpacity
                key={freq.id}
                style={[
                  styles.frequencyOption,
                  selectedFrequency === freq.id && styles.frequencyOptionSelected
                ]}
                onPress={() => setSelectedFrequency(freq.id)}
              >
                <Text style={[
                  styles.frequencyText,
                  selectedFrequency === freq.id && styles.frequencyTextSelected
                ]}>
                  {freq.label}
                </Text>
                {selectedFrequency === freq.id && (
                  <Ionicons name="checkmark" size={20} color="#6B4CCF" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Start Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Start Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={startDate}
              onChangeText={setStartDate}
              placeholderTextColor="#999"
            />
          </View>

          {/* Reminder Toggle */}
          <View style={styles.section}>
            <View style={styles.reminderRow}>
              <View>
                <Text style={styles.sectionTitle}>Reminder Notifications</Text>
                <Text style={styles.reminderSubtext}>
                  Get notified when it&#39;s time to take your medication
                </Text>
              </View>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                trackColor={{ false: "#E0E0E0", true: "#6B4CCF" }}
                thumbColor={reminderEnabled ? "#fff" : "#f4f3f4"}
              />
            </View>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes (Optional)</Text>
            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Add any additional notes..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              placeholderTextColor="#999"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <LinearGradient
              colors={["#7B5CF4", "#6B4CCF"]}
              style={styles.saveButtonGradient}
            >
              <Text style={styles.saveButtonText}>Add Medication</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
  },
  headerTitle: {
    flex: 1,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 40, // Offset for back button
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: "#1A1A1A",
  },
  notesInput: {
    height: 100,
    textAlignVertical: "top",
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  typeButton: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  typeButtonSelected: {
    borderColor: "#6B4CCF",
    backgroundColor: "#F3F0FF",
  },
  typeButtonText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    fontWeight: "500",
  },
  typeButtonTextSelected: {
    color: "#6B4CCF",
    fontWeight: "600",
  },
  frequencyOption: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  frequencyOptionSelected: {
    borderColor: "#6B4CCF",
    backgroundColor: "#F3F0FF",
  },
  frequencyText: {
    fontSize: 16,
    color: "#1A1A1A",
  },
  frequencyTextSelected: {
    color: "#6B4CCF",
    fontWeight: "600",
  },
  reminderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  reminderSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  saveButtonGradient: {
    padding: 18,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});