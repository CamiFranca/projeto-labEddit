import { LikeOrDislikePostDB, postAndCreatorDB, PostDB } from "../dtos/PostDTO";
import { PostModelDB } from "../models/Posts";
import { UserModelDB } from "../models/Users";
import { POST_LIKE } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_USERS = "users"
  public static TABLE_LIKES_DISLIKES_POST = "likes_dislikes_post"

  public async getPosts(): Promise<PostModelDB[]> {
    const result: PostModelDB[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select()
    return result
  }

  public async getPostById(id: string): Promise<PostDB[]| undefined> {
    const result: PostDB[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ id: id })
    return result
  }

  public async getUserById(id: string): Promise<UserModelDB> {
    const result: UserModelDB[] = await BaseDatabase
      .connection(PostDatabase.TABLE_USERS)
      .select()
      .where({ id })
    return result[0]
  }

  public async insertNewPost(postDB: PostModelDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .insert(postDB)
  }

  public async findPostById(id: string): Promise<PostDB | undefined> {
    const result: PostDB[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select()
      .where({ id: id })

    return result[0]
  }

  public async update(id: string, updatedContent: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .update(updatedContent)
      .where({ id: id })
  }

  public async deletePostById(id: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .delete()
      .where({ id: id })
  }
  public async findPostAndUserById(post_id: string): Promise<postAndCreatorDB | undefined> {
    const result: postAndCreatorDB[] =
      await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .select(
          "posts.id",
          "posts.creator_id",
          "posts.content",
          "posts.likes",
          "posts.dislikes",
          "posts.comments",
          "users.nick_name AS creator_name "
        )
        .join("users", "posts.creator_id", "=", "users.id")
        .where("posts.id", post_id)
    return result[0]
  }

  public findLikeDislike = async (likeDislikeDBToFind: LikeOrDislikePostDB): Promise<POST_LIKE | null> => {
    const [likeDislikeDB]: LikeOrDislikePostDB[] = await BaseDatabase
      .connection(PostDatabase.TABLE_LIKES_DISLIKES_POST)
      .select()
      .where({
        user_id: likeDislikeDBToFind.user_id,
        post_id: likeDislikeDBToFind.post_id
      })

    if (likeDislikeDB) {
      return likeDislikeDB.like === 1
        ? POST_LIKE.ALREADY_LIKED
        : POST_LIKE.ALREADY_DISLIKED

    } else {
      return null
    }
  }

  public updateLikeDislike = async (likeDislikeDB: LikeOrDislikePostDB) => {
    await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES_POST)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public removeLikeDislike = async ( likeDislikeDB: LikeOrDislikePostDB): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES_POST)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id
      })
  }

  public likeOrDislikePost = async (likeDislike: LikeOrDislikePostDB): Promise<void> => {
    await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES_POST)
      .insert(likeDislike)
  }


}     
