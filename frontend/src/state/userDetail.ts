import { atom } from "recoil";

export const userAtom = atom<UserDetailType>({
    key: "UserAtom",
    default: {
        "id": "",
        "email": "",
        "name": " ",
        "noPost": null
    }
})

interface UserDetailType {
    id: string,
    email: string,
    name: string,
    noPost: number | null
}