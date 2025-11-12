import PostListScreen from "./src/screens/PostListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPostScreen from "./src/screens/AddPostScreen";
import PostDetailScreen from "./src/screens/PostDetailScreen";
import ModifyPostScreen from "./src/screens/ModifyPostScreen";

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					options={{ title: "게시물 목록", headerLargeTitle: true }}
					name="PostList"
					component={PostListScreen}
				/>
				<Stack.Screen
					options={{
						title: "게시물 추가",
						headerLargeTitle: true,
						presentation: "formSheet",
						sheetGrabberVisible: true,
						gestureEnabled: false,
					}}
					name="AddPostModal"
					component={AddPostScreen}
				/>
				<Stack.Screen
					options={{ title: "게시물 상세" }}
					name="PostDetail"
					component={PostDetailScreen}
				/>
				<Stack.Screen
					options={{
						title: "게시물 수정",
						headerLargeTitle: true,
						presentation: "formSheet",
						sheetGrabberVisible: true,
						gestureEnabled: false,
					}}
					name="ModifyPostModal"
					component={ModifyPostScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
