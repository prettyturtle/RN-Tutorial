import { Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddPostFloatingButton = () => {
	const safeAreaInsets = useSafeAreaInsets();

	return (
		<Pressable
			style={[styles.container, { bottom: safeAreaInsets.bottom }]}
		>
			<Text style={styles.text}>+</Text>
		</Pressable>
	);
};

export default AddPostFloatingButton;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		right: 16,
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFA500",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	text: {
		fontSize: 24,
		fontWeight: "semibold",
		color: "#212529",
	},
});
