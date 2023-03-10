


export interface PostModelBusiness {
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: string
}

export interface PostModelDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: string
}

export class Posts {

    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private comments: string,
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }
    public getCreatorId(): string {
        return this.id
    }

    public setCreatorId(value: string): void {
        this.id = value
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

    public getComments(): string {
        return this.comments
    }

    public setComments(value: string): void {
        this.comments = value
    }

    public toDBModel(): PostModelDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments: this.comments,

        }
    }

    public toBusinessModel(): PostModelBusiness {
        return {
            id: this.id,
            creatorId: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments: this.comments

        }
    }

}

