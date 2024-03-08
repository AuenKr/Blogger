import LoadingBar from "react-top-loading-bar";
import { useRecoilValue } from "recoil";
import { progressBarAtom } from "../state/atom/progressBar";

export const ProgressBar = () => {
    const progress = useRecoilValue(progressBarAtom);
    return (
        <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => progress}
        />
    );
};
