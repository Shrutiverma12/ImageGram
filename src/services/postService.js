import {
  countAllPosts,
  createPost,
  deletePostById,
  findAllPosts,
  findPostById,
  updatePostById,
} from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
  //1-Take the image of post and upload on aws

  //2-Get the url of the image from the aws response

  //3-Create a post the caption and the image url in the db using repository

  //4-Return the post object

  const caption = createPostObject.caption?.trim();
  const image = createPostObject.image;
  const cloudinary_id = createPostObject.cloudinary_id;
  const user = createPostObject.user;

  console.log(user);

  const post = await createPost(caption, image, cloudinary_id, user);
  return post;
};

export const getAllPostsService = async (offset, limit) => {
  const posts = await findAllPosts(offset, limit);
  //calculate total number of page and total number of doc
  const totalDocuments = await countAllPosts();

  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    posts,
    totalPages,
    totalDocuments,
  };
};

export const deletePostervice = async (id) => {
  const response = await deletePostById(id);
  return response;
};

export const updatePostService = async (id, updateObject) => {
  const response = await updatePostById(id, updateObject);
  return response;
};

export const findPostByIdService = async (id) => {
  const response = await findPostById(id);
  return response;
};
