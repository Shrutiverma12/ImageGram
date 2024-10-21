import { uploader } from "../config/cloudinaryConfig.js";
import {
  createPostService,
  deletePostervice,
  findPostByIdService,
  getAllPostsService,
  updatePostService,
} from "../services/postService.js";

export async function createPost(req, res) {
  //call the service layer
  //console.log(req.file);

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image is required ",
    });
  }
  const data = req.file.buffer.toString("base64");
  try {
    const dataURI = `data:image/jpeg;base64,${data}`;
    const result = await uploader.upload(dataURI);

    const post = await createPostService({
      caption: req.body.caption,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
    console.log("Post created successfully");

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
    const post = await findPostByIdService(postId);

    const result = await uploader.destroy(post.cloudinary_id);
    console.log(result);

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

export async function updatePost(req, res) {
  try {
    const postId = req.params.id;
    const post = await findPostByIdService(postId);

    const result = await uploader.destroy(post.cloudinary_id);
    console.log("Post updation is", result);

    const updateObject = req.body;
    if (req.file) {
      const data = req.file.buffer.toString("base64");
      const dataURI = `data:image/jpeg;base64,${data}`;
      const result = await uploader.upload(dataURI);
      updateObject.image = result.secure_url;
    }
    const response = await updatePostService(req.params.id, updateObject);
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error Not Updated",
    });
  }
}
