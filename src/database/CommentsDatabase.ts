// import { UserModelBusiness, UserModelDB } from "../models/Users";
// import { CommentsDB } from "../types";
// import { BaseDatabase } from "./BaseDatabase";


// export class CommentsDatabase extends BaseDatabase{
//     public static TABLE_COMMENTS ="comments"

//     public getAllComments = async (id:string):Promise<CommentsDB[]> =>{

//         return await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
//         .where({post_id:id})
//     }
// }