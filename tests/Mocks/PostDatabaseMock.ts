import { BaseDatabase } from "../../src/database/BaseDatabase";
import { LikeOrDislikePostDB, postAndCreatorDB, PostDB } from "../../src/dtos/PostDTO";
import { PostModelDB } from "../../src/models/Posts"
import { UserModelDB } from "../../src/models/Users";
import { POST_LIKE, USER_ROLES } from "../../src/types";

export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_USERS = "users"
    public static TABLE_LIKES_DISLIKES_POST = "likes_dislikes_post"

    public getPosts = async (): Promise<PostModelDB[]> => {

        return[ {
            id: "id-mock-post",
            creator_id: "id-mock",
            content: "realizando testes",
            likes: 1,
            dislikes: 2,
            comments: 0
        }]


    }

    public getPostById = async (id: string): Promise<PostDB[]| undefined> => {

        if (id === "id-mock-post") {
            return [
                {
                    id: "id-mock-post",
                    creator_id: "id-mock",
                    content: "realizando testes",
                    likes: 1,
                    dislikes: 2,
                    comments: 0
                }

            ]

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

    public insertNewPost = async (postDB: PostModelDB): Promise<void> => {

    }

    public async findPostById(id: string): Promise<PostDB | undefined> {
        return {
            id: "id-mock-post",
            creator_id: "id-mock",
            content: "realizando testes",
            likes: 1,
            dislikes: 2,
            comments: 0
        }

    }

    public async update(id: string, updatedContent: PostDB): Promise<void> {

    }

    public async deletePostById(id: string): Promise<void> {

    }

    public async findPostAndUserById(post_id: string): Promise<postAndCreatorDB | undefined> {

        if (post_id === "id-mock-post") {
            return {
                id: "id-mock-post",
                creator_id: "id-mock",
                content: "realizando testes",
                likes: 1,
                dislikes: 2,
                comments: 0,
                creator_name: "Normal Mock"
            }
        }

    }

    public findLikeDislike = async (likeDislikeDBToFind: LikeOrDislikePostDB): Promise<POST_LIKE | null> => {

        if (likeDislikeDBToFind.user_id === "id-mock" && likeDislikeDBToFind.post_id === "id-mock-post") {
            return POST_LIKE.ALREADY_LIKED;
        } else if (likeDislikeDBToFind.user_id === "id-mock" && likeDislikeDBToFind.post_id === "id-mock-post") {
            return POST_LIKE.ALREADY_DISLIKED;
        } else {
            return null;
        }

    }
    public updateLikeDislike = async (likeDislikeDB: LikeOrDislikePostDB) => {

    }

    public removeLikeDislike = async (likeDislikeDB: LikeOrDislikePostDB): Promise<void> => {

    }

    public likeOrDislikePost = async (likeDislike: LikeOrDislikePostDB): Promise<void> => {

    }

}