import {
	Alert,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPosts, Post, posts } from "../data/postData";
import { useEffect, useState } from "react";
import AddPostFloatingButton from "../components/AddPostFloatingButton";

const PostListScreen = () => {
	const [postList, setPostList] = useState<Post[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		const response = getPosts();

		if (response.result) {
			if (response.data) {
				setPostList(response.data);
			} else {
				setPostList([]);
			}
		} else {
			Alert.alert(response.message);
		}
	}, []);

	const renderItem = ({ item }: { item: Post }) => {
		return (
			<Pressable style={styles.postItem}>
				<Text style={styles.postItemTitle}>{item.title}</Text>
				<Text style={styles.postItemContent}>{item.content}</Text>
			</Pressable>
		);
	};

	useEffect(() => {
		if (refreshing) {
			setPostList(posts);
			setRefreshing(false);
		}
	}, [refreshing]);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>게시물 목록</Text>

			<FlatList
				data={postList}
				renderItem={renderItem}
				style={styles.postList}
				contentContainerStyle={styles.postListContentContainer}
				refreshing={refreshing}
				onRefresh={() => setRefreshing(true)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>게시물이 없습니다.</Text>
					</View>
				}
			/>

			<AddPostFloatingButton />
		</SafeAreaView>
	);
};

export default PostListScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		rowGap: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#212529",
	},
	postList: {},
	postListContentContainer: {
		rowGap: 8,
		flexGrow: 1,
	},
	postItem: {
		borderWidth: 1,
		borderColor: "#f0f0f0",
		borderRadius: 8,
		padding: 16,
		rowGap: 4,
	},
	postItemTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#212529",
	},
	postItemContent: {
		fontSize: 14,
		color: "#666666",
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	emptyText: {
		fontSize: 14,
		color: "#666666",
	},
});
