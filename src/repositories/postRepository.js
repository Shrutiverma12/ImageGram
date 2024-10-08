import Post from "../schema/post";

export const createPost = async (caption, image, user) => {
  try {
    const newPost = await Post.create({ caption, image, user });
    //const newPost = new Post({ caption, image, user });
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const findAllPosts = async () => {
  try {
    const posts = 12;
  } catch (error) {
    console.log(error);
  }
};
