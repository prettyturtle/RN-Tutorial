type Response<T> = {
	result: boolean;
	message: string;
	data: T | null;
	errorCode: number | null;
};

type AddPostDto = {
	title: string;
	content: string;
};

export type Post = {
	id: number;
	title: string;
	content: string;
	date: Date;
};

export let posts: Post[] = [
	{
		id: 1,
		title: "첫 번째 글",
		content: "안녕하세요! React Native 블로그 시작합니다.",
		date: new Date(),
	},
	{
		id: 2,
		title: "두 번째 글",
		content: "안녕하세요! React Native 블로그 시작합니다.",
		date: new Date(),
	},
	{
		id: 3,
		title: "세 번째 글",
		content: "안녕하세요! React Native 블로그 시작합니다.",
		date: new Date(),
	},
];

const generateId = () => {
	return posts.length + 1;
};

export const addPost = (post: AddPostDto): Response<Post> => {
	if (!post.title || !post.content) {
		return {
			result: false,
			message: "게시물 추가 실패",
			data: null,
			errorCode: 400,
		};
	}

	const newPost = {
		id: generateId(),
		...post,
		date: new Date(),
	};

	posts.push(newPost);

	return {
		result: true,
		message: "게시물 추가 성공",
		data: newPost,
		errorCode: null,
	};
};

export const updatePost = (post: Post): Response<Post> => {
	const idx = posts.findIndex(p => p.id === post.id);

	if (idx === -1) {
		return {
			result: false,
			message: "게시물 수정 실패",
			data: null,
			errorCode: 404,
		};
	}

	posts[idx] = post;

	return {
		result: true,
		message: "게시물 수정 성공",
		data: post,
		errorCode: null,
	};
};

export const deletePost = (id: number) => {
	posts = posts.filter(p => p.id !== id);
};

export const getPosts = (): Response<Post[]> => {
	return {
		result: true,
		message: "게시물 조회 성공",
		data: posts,
		errorCode: null,
	};
};

export const getPost = (id: number): Response<Post> => {
	const post = posts.find(p => p.id === id);

	if (!post) {
		return {
			result: false,
			message: "게시물 조회 실패",
			data: null,
			errorCode: 404,
		};
	}

	return {
		result: true,
		message: "게시물 조회 성공",
		data: post,
		errorCode: null,
	};
};
