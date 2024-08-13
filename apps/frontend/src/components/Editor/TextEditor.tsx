// @ts-nocheck
import JoditEditor from "jodit-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { editorContentAtom } from "../../state/editorContent";
import { ButtonSCN } from "../ui/button";
import { useAI } from "../../hooks/useAI";
import { GenerateAiBtn } from "../GenerateAiBtn";

export const TextEditor = ({
    placeholder = " ",
    type = EditorType.editMode,
}: {
    placeholder?: string;
    type?: EditorType;
}) => {
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
            {type === EditorType.createMode && (
                <div className="absolute bottom-9 right-3">
                    <GenerateAiBtn />
                </div>
            )}
        </>
    );
};

export enum EditorType {
    createMode,
    editMode,
}
