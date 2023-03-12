
export class LikeDislikeComment {
    constructor(
        private userId:string, 
        private commentId:string, 
        private like:number
    ){}

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getCommentId(): string {
        return this.commentId
    }

    public setCommentId(value: string): void {
        this.commentId = value
    }

    public getLike(): number {
        return this.like
    }

    public setLike(value: number): void {
        this.like = value
    }

   
}