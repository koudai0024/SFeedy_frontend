import { connectPagination } from "react-instantsearch-dom";

export const CustomPagination = connectPagination(
  ({ currentRefinement, nbPages, refine, createURL }) => {
    const handleNext = () => {
      refine(currentRefinement + 1);
    };
    const handlePrev = () => {
      refine(currentRefinement - 1);
    };

    if (nbPages <= 1) {
      return null;
    }
    if (currentRefinement === 1) {
      return (
        <div className="flex items-center justify-center mt-4">
          <a
            href={createURL(currentRefinement + 1)}
            onClick={handleNext}
            className="rounded-full px-4 py-2 bg-blue-600 text-white"
          >
            次のページ＞
          </a>
        </div>
      );
    }
    if (nbPages === currentRefinement) {
      return (
        <div className="flex items-center justify-center mt-4">
          <a
            href={createURL(currentRefinement + 1)}
            onClick={handlePrev}
            className="rounded-full px-4 py-2 bg-blue-600 text-white"
          >
            ＜前のページ
          </a>
        </div>
      );
    }
    return (
      <div className="flex justify-center w-full mx-auto space-x-2">
        <a
          href={createURL(currentRefinement + 1)}
          onClick={handlePrev}
          className="rounded-full px-4 py-2 bg-blue-600 text-white"
        >
          ＜前のページ
        </a>
        <a
          href={createURL(currentRefinement + 1)}
          onClick={handleNext}
          className="rounded-full px-4 py-2 bg-blue-600 text-white"
        >
          次のページ＞
        </a>
      </div>
    );
  }
);
