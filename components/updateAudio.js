import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { deleteRecord } from "./recordsDB";

export default function UpdateAudio({ record }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(record.title);

  return (
    <>
      <TouchableOpacity>
        <FontAwesome name="edit" size={24} color="black" />
      </TouchableOpacity>
      <Modal visible={modalOpen} transparent>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <TextInput
              style={styles.input}
              placeholder="Edit file name"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Pressable style={styles.saveButton} onPress={()=>updateRecord(id, { url, title, duration })}>
              <Text style={styles.saveButtonText}>Save changes</Text>
            </Pressable>
            <Pressable style={styles.saveButton} onPress={()=>setModalOpen(false)}>
              <Text style={styles.saveButtonText}>cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "#e63f59",
    padding: 10,
    borderRadius: 5,
    marginRight:10
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
