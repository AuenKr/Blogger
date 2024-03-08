// @ts-nocheck
import JoditEditor from "jodit-react";
import React, { useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { editorContentAtom } from "../../state/atom/editorContent";

export const TextEditor = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useRecoilState(editorContentAtom);
    const config = useMemo(
        () => ({
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeholder || "Start typings...",
            height: "82vh",
        }),
        [placeholder]
    );
    return (
        <>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onChange={(newContent) => setContent(newContent)}
            />
        </>
    );
};
