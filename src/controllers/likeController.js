import {
  createLikeService,
  findLikeByIdService,
} from "../services/likeService.js";

export async function createLike(req, res) {
  try {
    const { onModel, likeableId, likeType } = req.body;
    const response = await createLikeService(
      onModel,
      req.user._id,
      likeableId,
      likeType
    );
    if (response.status === 400) {
      return res.status(400).json({ message: response.message });
    }
    return res.status(201).json({
      success: true,
      message: "Like created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
}

export async function getLikeById(req, res) {
  try {
    const likeId = req.params.id;
    const response = await findLikeByIdService(likeId);

    return res.status(201).json({
      success: true,
      message: "Like found successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
}
