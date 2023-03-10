// export interface CommentModel {

//     id: string,
//     creatorId: string,
//     postId: string,
//     comments: string,
//     likes: number,
//     dislikes: number,
//     creator: {
//         id: string,
//         name: string
//     }
// }

// export interface CommentModelDB {
//     id: string,
//     creator_id: string,
//     post_id: string,
//     comments: string,
//     likes: number,
//     dislikes: number

// }

// export class Comments {

//     constructor(
//         private id: string,
//         private creatorId: string,
//         private postId: string,
//         private comments: string,
//         private likes: number,
//         private dislikes: number,
  

//     ) { }

//     public getId(): string {
//         return this.id
//     }

//     public setId(value: string): void {
//         this.id = value
//     }

//     public getCreator_id(): string {
//         return this.creatorId
//     }

//     public setCreator_id(value: string): void {
//         this.creatorId = value
//     }

//     public getPost_id(): string {
//         return this.postId
//     }

//     public setPost_id(value: string): void {
//         this.postId = value
//     }

//     public getComments(): string {
//         return this.comments
//     }

//     public setComments(value: string): void {
//         this.comments = value
//     }

//     public getLikes(): number {
//         return this.likes
//     }

//     public setLikes(value: number): void {
//         this.likes = value
//     }

//     public getDislikes(): number {
//         return this.dislikes
//     }

//     public setDislikes(value: number): void {
//         this.dislikes = value
//     }

  
//     public addLike() {
//         this.likes += 1
//     }

//     public deleteLike() {
//         this.likes -= 1
//     }

//     public addDeslike() {
//         this.dislikes += 1
//     }

//     public removeDeslike() {
//         this.dislikes -= 1
//     }
//     public toDBModel(): CommentModelDB {
//         return {
//             id: this.id,
//             post_id: this.postId,
//             creator_id: this.creatorId,
//             comments: this.comments,
//             likes: this.likes,
//             dislikes: this.dislikes
       
//         }
//     }
//     public toBusinessModel(): CommentModel{
//         return {
//             id: this.id,
//             postId: this.postId,
//             creatorId: this.creatorId,
//             comments: this.comments,
//             likes: this.likes,
//             dislikes: this.dislikes,
//                      creator : {
//                 id: this.creatorId,
//                 name: this.creatorName
//             }
//         }
//     }
// }