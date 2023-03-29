export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
    nick_name: string,
    role: USER_ROLES
}

export interface DeletePost {
    token: string
}

export interface Like {
    token: string,
    like: string
}

export interface Dislike {
    token: string,
    dislike: string
}

export interface SignupOutput {
    token: string
}

export interface LoginOutput {
    token: string
}

export interface CommentsDB {
    id: string,
    creator_id: string,
    post_id: string
    comments: string,
    likes: number,
    dislikes: number,

}
export interface CommentsAndItCreatorDB extends CommentsDB {

    creator_name: string
}
export interface CommentsModel {
    id: string,
    comments: string,
    likes: number,
    dislikes: number,
    postId: string,
    creator: {
        id: string,
        nickName: string
    }
}
export enum POST_LIKE {
    ALREADY_LIKED = "jÁ CURTI",
    ALREADY_DISLIKED = "JÁ DISCURTI"
}

export enum COMMENT_LIKE {
    ALREADY_LIKED = "jÁ CURTI",
    ALREADY_DISLIKED = "JÁ DISCURTI"
}

