import {
  createLike,
  findLikeById,
  likeExist,
} from "../repositories/likeRepository.js";
import { findCommentById } from "../repositories/commentRepository.js";
import { findPostById } from "../repositories/postRepository.js";

export const createLikeService = async (
  onModel,
  userId,
  likableId,
  likeType
) => {
  try {
    let existLike = likeExist(userId, likableId, onModel);
    if (existLike) {
      return { message: "You have already liked it", status: 400 };
    }
    let post = await fetchLikeParent(onModel, likableId);
    if (!post) {
      throw {
        message: `${onModel} not found`,
        status: 404,
      };
    }
    const newLike = await createLike(onModel, userId, likableId, likeType);

    await addLikeToParent(newLike, post);
    return newLike;
  } catch (error) {
    console.log(error);
  }
};

const fetchLikeParent = async (onModel, likableId) => {
  try {
    let parent;
    if (onModel === "Post") {
      parent = await findPostById(likableId);
    } else if (onModel === "Comment") {
      parent = await findCommentById(likableId);
    }
    return parent;
  } catch (error) {
    console.log(error);
  }
};

const addLikeToParent = async (like, post) => {
  try {
    post.likes.push(like._id);
    await post.save();
  } catch (error) {
    console.log(error);
  }
};

export const findLikeByIdService = async (id) => {
  try {
    const response = await findLikeById(id);
    if (!response) {
      throw {
        message: "Like not found",
        status: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
