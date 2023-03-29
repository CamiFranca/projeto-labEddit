export class HashManagerMock{
public hash = async (plaintex:string ):Promise <string> =>{
    if(plaintex === "bananinha"){
        return "hash-bananinha"
    }
    return "hash-mock"
}

public compare = async (plaintex:string, hash:string):Promise<boolean> =>{
    if(plaintex === "bananinha" && hash === "hash-bananinha"){
        return true
    }
        return false
}

}