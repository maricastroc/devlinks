import PaginationButton from "@/Components/PaginationButton";
import { SubscribersResult } from "../Show";
import { EmailListProps } from "@/types/emailList";
import { router } from "@inertiajs/react";

type Props = {
  subscribers: SubscribersResult;
  emailList: EmailListProps;
};

export function PaginationContainer({ subscribers, emailList }: Props) {
  const totalPages = Math.ceil(subscribers.total / subscribers.per_page);
  const currentPage = subscribers.current_page;

  let middlePages: number[] = [];

  if (totalPages <= 5) {
    middlePages = Array.from({ length: totalPages - 2 }, (_, i) => i + 2);
  } else {
    if (currentPage <= 3) {
      middlePages = [2, 3, 4];
    } else if (currentPage >= totalPages - 2) {
      middlePages = [totalPages - 3, totalPages - 2, totalPages - 1];
    } else {
      middlePages = [currentPage - 1, currentPage, currentPage + 1];
    }
  }

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm">
        Showing{" "}
        <span className="font-bold text-gray-200">{subscribers.from}</span> to{" "}
        <span className="font-bold text-gray-200">{subscribers.to}</span> |{" "}
        <span className="font-bold text-gray-200">{subscribers.total}</span>{" "}
        subscribers
      </p>

      <div className="flex items-center gap-2">
        <PaginationButton
          onClick={() =>
            router.get(
              route("lists.edit", {
                emailList: emailList.id,
                page: 1,
              }),
              {},
              { preserveState: true, replace: true }
            )
          }
          isActive={currentPage === 1}
        >
          1
        </PaginationButton>

        {middlePages[0] > 2 && <span className="text-gray-400">...</span>}

        {middlePages.map((page) => (
          <PaginationButton
            key={page}
            onClick={() =>
              router.get(
                route("lists.edit", {
                  emailList: emailList.id,
                  page,
                }),
                {},
                { preserveState: true, replace: true }
              )
            }
            isActive={page === currentPage}
          >
            {page}
          </PaginationButton>
        ))}

        {middlePages[middlePages.length - 1] < totalPages - 1 && (
          <span className="text-gray-400">...</span>
        )}

        {totalPages > 1 && (
          <PaginationButton
            onClick={() =>
              router.get(
                route("lists.edit", {
                  emailList: emailList.id,
                  page: totalPages,
                }),
                {},
                { preserveState: true, replace: true }
              )
            }
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationButton>
        )}
      </div>
    </div>
  );
}
