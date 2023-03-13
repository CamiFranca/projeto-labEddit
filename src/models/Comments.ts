import { USER_ROLES } from "../types"
//     id TEXT PRIMARY KEY UNIQUE NOT NULL,
//     creator_id TEXT NOT NULL,
//     post_id TEXT NOT NULL,
//     comments TEXT NOT NULL,
//     likes INTEGER DEFAULT(0) NOT NULL,
//     dislikes INTEGER DEFAULT (0) NOT NULL,

export interface CommentsModel {

    id: string,
    postId: string,
    comments: string,
    likes: number,
    dislikes: number,
    creator: {
        id: string,
        nickName: string
    }
}

export interface CommentModelDB {
    id: string,
    creator_id: string,
    post_id: string,
    comments: string,
    likes: number,
    dislikes: number

}

export class Comments {

    constructor(
        private id: string,
        private postId: string,
        private comments: string,
        private likes: number,
        private dislikes: number,
        private creator: {
            id: string,
            nick_name: string,
            role: USER_ROLES
        }

    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getPost_id(): string {
        return this.postId
    }

    public setPost_id(value: string): void {
        this.postId = value
    }

    public getComments(): string {
        return this.comments
    }

    public setComments(value: string): void {
        this.comments = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }


    public addLike() {
        this.likes += 1
    }

    public deleteLike() {
        this.likes -= 1
    }

    public addDeslike() {
        this.dislikes += 1
    }

    public deleteDeslike() {
        this.dislikes -= 1
    }

    public getCreator(): { id: string, nick_name: string } { return this.creator }

    public toDBModel(): CommentModelDB {
        return {
            id: this.id,
            post_id: this.postId,
            creator_id: this.creator.id,
            comments: this.comments,
            likes: this.likes,
            dislikes: this.dislikes

        }
    }
    public toBusinessModel(): CommentsModel {
        return {
            id: this.id,
            postId: this.postId,
            comments: this.comments,
            likes: this.likes,
            dislikes: this.dislikes,
            creator: {
                id: this.id,
                nickName: this.creator.nick_name,

            }
        }
    }
}