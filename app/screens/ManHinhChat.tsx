import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ManHinhChat = ({ navigation }: any) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là trợ lý thư viện. Bạn cần hỗ trợ gì?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // Hàm gửi tin nhắn
  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Tự động trả lời sau 1 giây
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Cảm ơn bạn đã liên hệ. Tôi sẽ trả lời sớm nhất có thể.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, replyMessage]);
    }, 1000);
  };

  // Render từng tin nhắn
  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat với Thư Thư</Text>
        <Text style={styles.headerSubtitle}>Trực tuyến</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Nhập tin nhắn..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e7f3ff",
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ManHinhChat;
