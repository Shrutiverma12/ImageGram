import { uploader } from "../config/cloudinaryConfig.js";
import {
  createPostService,
  deletePostervice,
  getAllPostsService,
} from "../services/postService.js";

export async function createPost(req, res) {
  //call the service layer
  const data = req.file.buffer.toString("base64");
  try {
    const dataURI = `data:image/jpeg;base64,${data}`;
    const result = await uploader.upload(dataURI, {
      folder: "home/ImageGram",
    });

    const post = await createPostService({
      caption: req.body.caption,
      image: result.secure_url,
    });

    return res.status(201).json({
      success: true,
      //url: result.secure_url,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Upload failed" });
  }
  //return res.json({ message: "Post Created Sucessfully" });
}

export async function getAllPosts(req, res) {
  try {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const paginatedPosts = await getAllPostsService(offset, limit);

    return res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      data: paginatedPosts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const response = await deletePostervice(postId);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post Deleted successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
