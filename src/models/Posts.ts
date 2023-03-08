


export interface PostModel {
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    comments:number,
    createdAt: string,
    updatedAt: string
    creator: {
        id: string,
        name: string
    }
}

export interface PostModelDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    created_at: string,
    updated_at: string,
}

export class Posts {

    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private comments: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string,
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }
    public getCreator_id(): string {
        return this.creatorId
    }

    public setName(value: string): void {
        this.creatorId = value
    }
    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
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

    public removeDeslike() {
        this.dislikes -= 1
    }

    public getComments(): number {
        return this.dislikes
    }

    public setComments(value: number): void {
        this.dislikes = value
    }

    public getCreated_at(): string {
        return this.createdAt
    }

    public setCreated_at(value: string): void {
        this.createdAt = value
    }
    public getUpdate_at(): string {
        return this.updatedAt
    }

    public setUpdate_at(value: string): void {
        this.updatedAt = value
    }

    public toDBModel(): PostModelDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments:this.comments,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }
    
    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            creatorId: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments:this.comments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator : {
                id: this.creatorId,
                name: this.creatorName
            }
        }
    }

}
    
