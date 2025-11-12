import { Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getPost, Post } from "../data/postData";

type RootStackParamList = {
	PostList: undefined;
	AddPostModal: undefined;
	PostDetail: { postId: number };
};

type Props = RouteProp<RootStackParamList, "PostDetail">;

const PostDetailScreen = () => {
	const route = useRoute<Props>();
	const { postId } = route.params;

	const [post, setPost] = useState<Post | null>(null);

	useEffect(() => {
		const response = getPost(postId);

		if (response.result && response.data) {
			setPost(response.data);
		} else {
			Alert.alert(response.message);
		}
	}, [postId]);

	if (!post) return null;

	return (
		<SafeAreaView style={styles.container} edges={[]}>
			<Text style={styles.postTitle}>{post.title}</Text>
			<Text style={styles.postContent}>{post.content}</Text>
		</SafeAreaView>
	);
};

export default PostDetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fdfdfd",
		rowGap: 16,
	},
	postTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#212529",
	},
	postContent: {
		fontSize: 16,
		color: "#666666",
	},
});
