import { PostDB } from "../dtos/PostDTO";
import { PostModelDB } from "../models/Posts";
import { UserModelDB } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"
  public static TABLE_USERS = "users"

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

}