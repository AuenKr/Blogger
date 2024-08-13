export const Quote = (quote: QuoteType) => {
    return (
        <div className="bg-slate-200 h-screen flex flex-col justify-center items-center dark:bg-slate-800">
            <div className="max-w-[100%] text-left text-2xl font-semibold space-y-1 lg:max-w-md lg:text-3xl">
                <div>
                    {quote.title ||
                        '"The Customer service I recive was exceptional. The support went above and beyond to address my concers"'}
                </div>
                <div className="text-lg font-medium">
                    {quote.author || "Jues Winnfield"}
                </div>
                <div className="text-sm font-normal text-slate-600 dark:text-slate-400">
                    {quote.authorPost || "CEO, Acme Inc"}
                </div>
            </div>
        </div>
    );
};

export interface QuoteType {
    title?: string;
    author?: string;
    authorPost?: string;
}
