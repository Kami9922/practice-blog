export const transformPost = (dbPost) => ({
	id: dbPost.id,
	title: dbPost.title,
	content: dbPost.content,
	imgUrl: dbPost.img_url,
	publishedAt: dbPost.published_at,
})
