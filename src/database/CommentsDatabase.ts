import { LikeDislikeComentsDB } from "../dtos/CommentsDTO";
import { LikeOrDislikeCommentsDB } from "../dtos/LikeOrDislikeDTO";
import { UserModelDB } from "../models/Users";
// import { LikeOrDislikeDB } from "../dtos/LikeOrDislikeDTO";
import { CommentsAndItCreatorDB, CommentsDB, COMMENT_LIKE } from "../types";
import { BaseDatabase } from "./BaseDatabase";


export class CommentsDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES_COMMENT = "likes_dislikes_comment"
    public static TABLE_USERS = "users"



    public getCommentsByPostId = async (id: string): Promise<CommentsDB[]> => {

        const result =await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
            .where({ post_id: id })
            return result
    }
    public insert = async (commentsDB: CommentsDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
            .insert(commentsDB)
    }
    public async findCommentsAndUserById(idLikeDislike: string): Promise<CommentsAndItCreatorDB | undefined> {
        const result: CommentsAndItCreatorDB[] =
            await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
                .select(
                    "comments.id",
                    "comments.creator_id",
                    "comments.post_id",
                    "comments.comments",
                    "comments.likes",
                    "comments.dislikes",
                    "users.nick_name AS creator_name "
                )
                .join("users", "comments.creator_id", "=", "users.id")
                .where("comments.id", idLikeDislike)
        return result[0]
    }

    public async getUserById(id: string): Promise<UserModelDB> {
        const result: UserModelDB[] = await BaseDatabase
          .connection(CommentsDatabase.TABLE_USERS)
          .select()
          .where({ id })
        return result[0]
      }

    public searchLikeDislike = async (formatLikeDislikeDB: LikeOrDislikeCommentsDB): Promise<COMMENT_LIKE | null> => {
        const [likeDislikeDB]: LikeDislikeComentsDB[] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENT)
            .select()
            .where({
                user_id: formatLikeDislikeDB.userId,
                comment_id: formatLikeDislikeDB.commentId
            })

        if (likeDislikeDB) {
            return likeDislikeDB.like === 1 ? COMMENT_LIKE.ALREADY_LIKED : COMMENT_LIKE.ALREADY_DISLIKED
        } else {
            return null
        }
    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikeComentsDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENT)
            .delete()
            .where({
                user_id: likeDislikeDB.userId,
                comment_id: likeDislikeDB.commentId
            })
    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikeComentsDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENT)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.userId,
                comment_id: likeDislikeDB.commentId
            })
    }
    public update = async (id: string, commentDB: CommentsDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
            .update(commentDB)
            .where({ id })
    }

    public commentsLikeOrDislike = async (likeDislike: LikeDislikeComentsDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENT)
        .insert(likeDislike)
    }
}