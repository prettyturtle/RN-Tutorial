import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addPost } from "../data/postData";

type RootStackParamList = {
	PostList: undefined;
	AddPostModal: undefined;
};

const AddPostScreen = () => {

	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = () => {

		if(!title || !content) {
			Alert.alert("제목과 내용을 입력해주세요.");
			return;
		}

		const response = addPost({ title, content });

		if(response.result) {
			Alert.alert(
				`${title} ${content} 추가되었습니다.`,
				"",
				[
					{
						text: "확인",
						onPress: () => navigation.goBack(),
					}
				],
				{ cancelable: false }
			);	
		} else {
			Alert.alert(response.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.form}>
				<View style={styles.formItem}>
					<Text style={styles.formItemTitle}>제목</Text>
					<TextInput placeholder="제목을 입력해주세요." value={title} onChangeText={setTitle} style={styles.formItemInput} />
				</View>

				<View style={styles.formItem}>
					<Text style={styles.formItemTitle}>내용</Text>
					<TextInput multiline={true} placeholder="내용을 입력해주세요." value={content} onChangeText={setContent} style={[styles.formItemInput, styles.formItemInputMultiline]} />
				</View>
			</View>

			<View style={styles.buttonContainer}>
				<Pressable onPress={() => navigation.goBack()} style={[styles.submitButton, styles.submitButtonSecondary]}>
					<Text style={[styles.submitButtonText, styles.submitButtonTextSecondary]}>취소</Text>
				</Pressable>
				<Pressable onPress={handleSubmit} style={[styles.submitButton, styles.submitButtonPrimary]}>
					<Text style={[styles.submitButtonText, styles.submitButtonTextPrimary]}>추가</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default AddPostScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fdfdfd",
	},
	form: {
		flex: 1,
		padding: 16,
		rowGap: 16,
	},
	formItem: {
		rowGap: 8,
	},
	formItemTitle: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#212529",
	},
	formItemInput: {
		borderWidth: 1,
		borderColor: "#f0f0f0",
		borderRadius: 8,
		padding: 8,
		backgroundColor: "#FFFFFF",
		height: 48,
		color: "#212529",
		fontSize: 16,
	},
	formItemInputMultiline: {
		height: 150,
	},
	buttonContainer: {
		flexDirection: "row",
		paddingHorizontal: 16,
		columnGap: 8,
	},
	submitButton: {
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		height: 48,
		flex: 1,
	},
	submitButtonPrimary: {
		backgroundColor: "#FFA500",
	},
	submitButtonSecondary: {
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#FFA500",
	},
	submitButtonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	submitButtonTextPrimary: {
		color: "#FFFFFF",
	},
	submitButtonTextSecondary: {
		color: "#FFA500",
	},
});
