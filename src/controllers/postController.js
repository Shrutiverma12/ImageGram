import { uploader } from "../config/cloudinaryConfig.js";

export async function createPost(req, res) {
  //call the service layer7
  //console.log(req.file);
  const data = req.file.buffer.toString("base64");
  try {
    const dataURI = `data:image/jpeg;base64,${data}`;

    const result = await uploader.upload(dataURI, {
      folder: "ImageGram",
    });
    return res.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Upload failed" });
  }

  // return res.json({ message: "Post Created Sucessfully" });
}
