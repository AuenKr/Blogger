import { atom } from "recoil";

export const userAtom = atom({
    key: "UserAtom",
    default: {
        "id": "",
        "email": "",
        "name": " "
    }
})