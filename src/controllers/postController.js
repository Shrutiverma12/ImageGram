import { uploader } from "../config/cloudinaryConfig.js";
import { createPostService } from "../services/postService.js";

export async function createPost(req, res) {
  //call the service layer
  const data = req.file.buffer.toString("base64");
  try {
    const dataURI = `data:image/jpeg;base64,${data}`;
    const result = await uploader.upload(dataURI, {
      asset_folder: "ImageGram",
    });

    const post = await createPostService({
      caption: req.body.caption,
      image: result.secure_url,
    });

    return res.status(201).json({
      success: true,
      url: result.secure_url,
      data: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Upload failed" });
  }
  //return res.json({ message: "Post Created Sucessfully" });
}
