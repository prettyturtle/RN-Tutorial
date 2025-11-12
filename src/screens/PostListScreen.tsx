import {
	Alert,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { deletePost, getPosts, Post, posts } from "../data/postData";
import { useCallback, useEffect, useState } from "react";
import AddPostFloatingButton from "../components/AddPostFloatingButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
	PostList: undefined;
	AddPostModal: undefined;
	PostDetail: { postId: number };
	ModifyPostModal: { postId: number };
};

const PostListScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const [postList, setPostList] = useState<Post[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	const loadPosts = useCallback(() => {
		const response = getPosts();

		if (response.result) {
			if (response.data) {
				setPostList([...response.data]);
			} else {
				setPostList([]);
			}
		} else {
			Alert.alert(response.message);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			loadPosts();
		}, [loadPosts]),
	);

	useEffect(() => {
		if (refreshing) {
			setPostList(posts);
			setRefreshing(false);
		}
	}, [refreshing]);

	const handlePressPost = (postId: number) => {
		navigation.navigate("PostDetail", { postId });
	};

	const handleLongPressPost = (postId: number) => {
		Alert.alert("편집 선택", "", [
			{
				text: "편집",
				onPress: () =>
					navigation.navigate("ModifyPostModal", { postId }),
			},
			{
				text: "삭제",
				onPress: () => handleDeletePost(postId),
			},
			{
				text: "취소",
				style: "cancel",
			},
		]);
	};

	const handleDeletePost = (postId: number) => {
		Alert.alert("게시물을 삭제하시겠습니까?", "", [
			{
				text: "삭제",
				onPress: () => {
					deletePost(postId);
					loadPosts();
				},
			},
			{
				text: "취소",
				style: "cancel",
			},
		]);
	};

	const renderItem = ({ item }: { item: Post }) => {
		return (
			<Pressable
				style={styles.postItem}
				onPress={() => handlePressPost(item.id)}
				onLongPress={() => handleLongPressPost(item.id)}
			>
				<Text style={styles.postItemTitle}>{item.title}</Text>
				<Text style={styles.postItemContent}>{item.content}</Text>
			</Pressable>
		);
	};

	const handlePressAddPost = () => {
		navigation.navigate("AddPostModal");
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={postList}
				renderItem={renderItem}
				style={styles.postList}
				contentContainerStyle={styles.postListContentContainer}
				refreshing={refreshing}
				onRefresh={() => setRefreshing(true)}
				contentInsetAdjustmentBehavior="automatic"
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>게시물이 없습니다.</Text>
					</View>
				}
			/>

			<AddPostFloatingButton onPress={handlePressAddPost} />
		</SafeAreaView>
	);
};

export default PostListScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fdfdfd",
	},
	// title: {
	// 	fontSize: 24,
	// 	fontWeight: "bold",
	// 	color: "#212529",
	// },
	postList: {
		padding: 16,
	},
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
		backgroundColor: "#fff",
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
