export class LikeDislikePost {
    constructor(
        private user_id:string, 
        private post_id:string, 
        private like:number
    ){}

    public getId(): string {
        return this.user_id
    }

    public setId(value: string): void {
        this.user_id = value
    }

    public getComment_id(): string {
        return this.post_id
    }

    public setComment_id(value: string): void {
        this.post_id = value
    }

    public getLike(): number {
        return this.like
    }

    public setLike(value: number): void {
        this.like = value
    }

}