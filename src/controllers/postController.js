export async function createPost(req, res) {
  //call the service layer7
  console.log(req.file);
  console.log("Helllll");

  return res.json({ message: "Post Created Sucessfully" });
}
