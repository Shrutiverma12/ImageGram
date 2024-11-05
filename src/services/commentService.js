import { findPostById } from "../repositories/postRepository"

export const createCommentService = async(content,userId,onModel,commentableId) =>{
    try {
        if(onModel === "Post"){
            const post = await findPostById(commentableId);
            if(!post){
                throw{
                    message:"Post not found",
                    status:404,
                }
            }
            const newComment = await createComme
        }

    } catch (error) {
        
    }
}