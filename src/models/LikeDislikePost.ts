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
   

    //  public getDislikes(): number {
    //     return this.dislike
    // }

    // public setDeslikes(value: number): void {
    //     this.deslikes = value
    // }

    public addLike(){
        this.like +=1
    }

    public deleteLike(){
        this.like -=1
    }

    // public addDeslike(){
    //     this.deslikes +=1
    // }

    // public removeDeslike(){
    //     this.deslikes -=1
    // } 

}