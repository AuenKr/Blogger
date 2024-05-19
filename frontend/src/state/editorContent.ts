import { atom } from "recoil";

export const editorContentAtom = atom({
    key: "editorContent",
    default: ""
})

export const editorTitleAtom = atom({
    key: "editorTitle",
    default: ""
})

// export const editorContentHistorySelector = selector({
//     key: "editorContentHistorySelector",
//     async get(get) {
//         return null;
//     },
// })