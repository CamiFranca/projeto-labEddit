import { LikeOrDislikeDB } from "../dtos/LikeOrDislikeDTO";
import { postAndCreatorDB, PostDB } from "../dtos/PostDTO";
import { PostModelDB } from "../models/Posts";
import { UserModelDB } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_USERS = "users"
  public static TABLE_LIKES_DISLIKES = "likes_dislikes_post"

  public async getPosts(): Promise<PostModelDB[]> {
    const result: PostModelDB[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select()
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
    console.log("database", id)
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
  public async findPostAndUserById(post_id:string):Promise<postAndCreatorDB | undefined>{
    const result : postAndCreatorDB[] =
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
    .select(
      "posts.id",
      "posts.creator_id",
      "posts.contente",
      "posts.like",
      "post.dislike",
      "post.commments",
      "users.nick_name AS creator_name "
    )
    .join("users","post.creator_id", "=", "users.id" )
    .where("post.id", post_id)
    return result[0]

  }

  public async likeOrDislike(formatLikeDislikeDB:LikeOrDislikeDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
    .insert(formatLikeDislikeDB )
  }
}     