import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { theme } from "../styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import Card from "../components/Card";

const { width } = Dimensions.get("window");

interface ChatMessage {
  id: string;
  message: string;
  role: "user" | "bot";
  timestamp: Date;
}

const ManHinhChatbox = ({ navigation }: any) => {
  const { theme: currentTheme } = useTheme();
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const suggestedQuestions = [
    "Làm thế nào để mượn sách?",
    "Thư viện mở cửa lúc nào?",
    "Cách tìm sách theo thể loại?",
    "Làm sao để gia hạn sách?",
    "Phí phạt khi trả sách muộn?",
    "Có thể đặt chỗ sách không?",
    "Sách cơ sở dữ liệu còn không?",
    "Tôi có bao nhiêu phiếu mượn?",
    "Sách đang ở vị trí nào?",
  ];

  // Welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      message:
        "Xin chào! Tôi là trợ lý ảo của thư viện. Tôi có thể giúp bạn:\n\n• Tìm kiếm sách theo thể loại\n• Hướng dẫn mượn/trả sách\n• Thông tin về giờ mở cửa\n• Giải đáp các câu hỏi thường gặp\n\nHãy hỏi tôi bất cứ điều gì bạn cần hỗ trợ!",
      role: "bot",
      timestamp: new Date(),
    };
    setChatMessages([welcomeMessage]);
  }, []);

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    setShowSuggestions(false);
    // Auto send after a brief delay
    setTimeout(() => {
      sendMessageFromSuggestion(question);
    }, 100);
  };

  const sendMessageFromSuggestion = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message,
      role: "user",
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập lại để sử dụng chatbot");
        setIsTyping(false);
        return;
      }

      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message }),
      });

      if (response.ok) {
        const data = await response.json();

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: data.reply,
          role: "bot",
          timestamp: new Date(),
        };

        setChatMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message:
            "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ.",
          role: "bot",
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message:
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet và thử lại.",
        role: "bot",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập lại để sử dụng chatbot");
        setIsTyping(false);
        return;
      }

      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage.message }),
      });

      if (response.ok) {
        const data = await response.json();

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: data.reply,
          role: "bot",
          timestamp: new Date(),
        };

        setChatMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message:
            "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ.",
          role: "bot",
          timestamp: new Date(),
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message:
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet và thử lại.",
        role: "bot",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === "user";

    return (
      <View
        style={[
          styles.messageWrapper,
          isUser ? styles.userMessageWrapper : styles.botMessageWrapper,
        ]}
      >
        {!isUser && (
          <View
            style={[
              styles.avatar,
              { backgroundColor: currentTheme.colors.primary },
            ]}
          >
            <Ionicons name="library" size={16} color="#fff" />
          </View>
        )}
        <View
          style={[
            styles.messageContainer,
            isUser ? styles.userMessage : styles.botMessage,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              { color: isUser ? "#fff" : currentTheme.colors.text },
            ]}
          >
            {item.message}
          </Text>
          <Text
            style={[
              styles.timestamp,
              {
                color: isUser
                  ? "rgba(255,255,255,0.7)"
                  : currentTheme.colors.textSecondary,
              },
            ]}
          >
            {item.timestamp.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        {isUser && (
          <View
            style={[
              styles.avatar,
              { backgroundColor: currentTheme.colors.secondary },
            ]}
          >
            <Ionicons name="person" size={16} color="#fff" />
          </View>
        )}
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <View style={styles.messageWrapper}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: currentTheme.colors.primary },
          ]}
        >
          <Ionicons name="library" size={16} color="#fff" />
        </View>
        <View
          style={[
            styles.messageContainer,
            styles.botMessage,
            styles.typingContainer,
          ]}
        >
          <View style={styles.typingDots}>
            <View
              style={[
                styles.typingDot,
                { backgroundColor: currentTheme.colors.primary },
              ]}
            />
            <View
              style={[
                styles.typingDot,
                { backgroundColor: currentTheme.colors.primary },
              ]}
            />
            <View
              style={[
                styles.typingDot,
                { backgroundColor: currentTheme.colors.primary },
              ]}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderSuggestions = () => {
    if (!showSuggestions || chatMessages.length > 1) return null;

    return (
      <View style={styles.suggestionsContainer}>
        <Text
          style={[
            styles.suggestionsTitle,
            { color: currentTheme.colors.textSecondary },
          ]}
        >
          Câu hỏi gợi ý:
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsList}
        >
          {suggestedQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.suggestionChip,
                {
                  backgroundColor: currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                },
              ]}
              onPress={() => handleSuggestedQuestion(question)}
            >
              <Text
                style={[
                  styles.suggestionText,
                  { color: currentTheme.colors.text },
                ]}
                numberOfLines={2}
              >
                {question}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: currentTheme.colors.background },
      ]}
    >
      <Header
        title="Chatbot Hỗ trợ"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
        rightIcon="refresh"
        onRightPress={() => {
          Alert.alert(
            "Khởi động lại",
            "Bạn có muốn xóa lịch sử trò chuyện và bắt đầu lại không?",
            [
              { text: "Hủy" },
              {
                text: "Đồng ý",
                onPress: () => {
                  const welcomeMessage: ChatMessage = {
                    id: "welcome",
                    message:
                      "Xin chào! Tôi là trợ lý ảo của thư viện. Tôi có thể giúp bạn:\n\n• Tìm kiếm sách theo thể loại\n• Hướng dẫn mượn/trả sách\n• Thông tin về giờ mở cửa\n• Giải đáp các câu hỏi thường gặp\n\nHãy hỏi tôi bất cứ điều gì bạn cần hỗ trợ!",
                    role: "bot",
                    timestamp: new Date(),
                  };
                  setChatMessages([welcomeMessage]);
                  setShowSuggestions(true);
                },
              },
            ]
          );
        }}
      />

      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={chatMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
        {renderTypingIndicator()}
      </View>

      {renderSuggestions()}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: currentTheme.colors.surface,
              borderTopColor: currentTheme.colors.border,
            },
          ]}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { color: currentTheme.colors.text }]}
              placeholder="Nhập câu hỏi của bạn..."
              placeholderTextColor={currentTheme.colors.textSecondary}
              value={inputMessage}
              onChangeText={setInputMessage}
              multiline
              maxLength={500}
            />
            {inputMessage.length > 0 && (
              <Text style={styles.charCount}>{inputMessage.length}/500</Text>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputMessage.trim()
                  ? currentTheme.colors.primary
                  : currentTheme.colors.textSecondary,
              },
            ]}
            onPress={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  messageWrapper: {
    flexDirection: "row",
    marginBottom: theme.spacing.md,
    alignItems: "flex-end",
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  botMessageWrapper: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: theme.spacing.sm,
  },
  messageContainer: {
    maxWidth: width * 0.75,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.light,
  },
  userMessage: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: theme.borderRadius.sm,
  },
  botMessage: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: theme.borderRadius.sm,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    marginTop: theme.spacing.xs,
    opacity: 0.8,
  },
  typingContainer: {
    minHeight: 50,
    justifyContent: "center",
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    opacity: 0.7,
  },
  suggestionsContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  suggestionsList: {
    paddingRight: theme.spacing.md,
  },
  suggestionChip: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    maxWidth: 200,
  },
  suggestionText: {
    fontSize: 14,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: theme.spacing.md,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === "ios" ? theme.spacing.xl : theme.spacing.md,
  },
  inputWrapper: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 44,
  },
  charCount: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: "right",
    marginTop: theme.spacing.xs,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.light,
  },
});

export default ManHinhChatbox;
