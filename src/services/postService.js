import { createPost } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
  //1-Take the image of post and upload on aws

  //2-Get the url of the image from the aws response

  //3-Create a post the caption and the image url in the db using repository

  //4-Return the post object

  const caption = createPostObject.caption?.trim();
  const image = createPostObject.image;
  //const user = createPostObject.user; add later

  const post = await createPost(caption, image);
  return post;
};
