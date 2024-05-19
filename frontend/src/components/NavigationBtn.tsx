import { useSetRecoilState } from "recoil";
import { ButtonSCN } from "./ui/button";
import { progressBarAtom } from "../state/progressBar";

export function NextPageBtn({
    currPage,
    setPage,
    totalPost,
}: {
    currPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPost: number;
}) {
    const setProgressBar = useSetRecoilState(progressBarAtom);
    let totalPage = Math.floor(totalPost / 5);
    if (totalPage % 5 == 0) totalPage--;
    if (currPage === totalPage) return;
    const onClickHandler = () => {
        setPage((prev) => prev + 1);
        setProgressBar(55);
    };
    return (
        <ButtonSCN className="w-24" onClick={onClickHandler}>
            Next
        </ButtonSCN>
    );
}

export function PreviousPageBtn({
    currPage,
    setPage,
    totalPost,
}: {
    currPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPost: number;
}) {
    const setProgressBar = useSetRecoilState(progressBarAtom)
    if (currPage === 0) return;
    let totalPage = Math.floor(totalPost / 5);
    if (totalPage % 5 == 0) totalPage--;
    const onClickHandler = () => {
        setPage((prev) => prev - 1);
        setProgressBar(55);
    };
    return (
        <ButtonSCN className="w-24" onClick={onClickHandler}>
            Previous
        </ButtonSCN>
    );
}
