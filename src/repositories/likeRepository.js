import Like from "../schema/like.js";
export const createLike = async (onModel, userId, likeableId, likeType) => {
  try {
    const newLike = await Like.create({
      onModel,
      userId,
      likeableId,
      likeType,
    });
    return newLike;
  } catch (error) {
    console.log(error);
  }
};

export const findLikeById = async (id) => {
  try {
    const like = await Like.findById(id).populate("likeType");
    return like;
  } catch (error) {
    console.log(error);
  }
};

export const likeExist = async (userId, likeableId, onModel) => {
  try {
    const existLike = await Like.findOne({ userId, likeableId, onModel });
    return existLike;
  } catch (error) {
    console.log(error);
  }
};
