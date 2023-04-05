import { BaseDatabase } from "../../src/database/BaseDatabase";
import { UserModelDB } from "../../src/models/Users";
import { COMMENT_LIKE, CommentsAndItCreatorDB, CommentsDB, USER_ROLES } from "../../src/types";
import { LikeDislikeComentsDB } from "../../src/dtos/CommentsDTO"
import { LikeOrDislikeCommentsDB } from "../../src/dtos/LikeOrDislikeDTO";

export class CommentsDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES_COMMENT = "likes_dislikes_comment"
    public static TABLE_USERS = "users"

    public getCommentsByPostId = async (post_id: string): Promise<CommentsDB[] | undefined> => {

        if (post_id === "id-mock-post") {

            return [
                {

                    id: "id-mock-comments",
                    creator_id: "id-mock",
                    post_id: "id-mock-post",
                    comments: "teste",
                    likes: 2,
                    dislikes: 2

                }
            ]
        }


    }

    public insert = async (commentsDB: CommentsDB): Promise<void> => {

    }

    public async findCommentsAndUserById(idLikeDislike: string): Promise<CommentsAndItCreatorDB | undefined> {

        if (idLikeDislike === "id-mock-comments") {

            return {
                id: "id-mock-comments",
                creator_id: "id-mock",
                post_id: "id-mock-post",
                comments: "teste",
                likes: 2,
                dislikes: 2,
                creator_name: "Normal mock"

            }
        }
    }

    public getUserById = async (q: string): Promise<UserModelDB> => {

        if (q === "id-mock") {
            return {
                id: "id-mock",
                nick_name: "Normal mock",
                email: "normal@email.com",
                password: "hash-bananinha",
                role: USER_ROLES.NORMAL
            }

        } else {

            return {
                id: "id-mock-admin",
                nick_name: "Admin Mock",
                email: "admin@email.com",
                password: "hash-bananinha",
                role: USER_ROLES.ADMIN
            }

        }
    }
    searchLikeDislike = async (formatLikeDislikeDB: LikeOrDislikeCommentsDB): Promise<COMMENT_LIKE | null> => {
        if (formatLikeDislikeDB.comment_id === "id-mock-comments" && formatLikeDislikeDB.user_id === "id-mock") {
            return COMMENT_LIKE.ALREADY_LIKED;
        } else if (formatLikeDislikeDB.comment_id === "id-mock-comments-II" && formatLikeDislikeDB.user_id === "id-mock-admin") {
            return COMMENT_LIKE.ALREADY_DISLIKED;
        } else {
            return null;
        }
    };

    public removeLikeDislike = async (likeDislikeDB: LikeDislikeComentsDB): Promise<void> => {

    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikeComentsDB): Promise<void> => {

    }

    public update = async (id: string, commentDB: CommentsDB): Promise<void> => {

    }

    public commentsLikeOrDislike = async (likeDislike: LikeDislikeComentsDB): Promise<void> => {

    }
}