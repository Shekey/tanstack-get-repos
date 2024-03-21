import { Grid } from "@/components/common/Grid";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { ListRepositories } from "@/components/templates/list-repositories";
import { Alert } from "@/components/ui/alert";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GitHub_API } from "@/lib/repository/github/api";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
const DEFAULT_USER = "Shekey";

export const Route = createFileRoute("/")({
  component: Index,
  staleTime: 100_000,
  errorComponent: ({ error }) => {
    return <div>{JSON.stringify(error)}</div>;
  },
  pendingComponent: () => (
    <>
      {Array.from({ length: 10 }).map((_, i) => () => <SkeletonCard key={i} />)}
    </>
  ),
  loader: async ({ abortController, location }) => {
    const searchParams = location.search as {
      user: string | undefined;
      page: number | undefined;
    };
    const data = await new GitHub_API(
      searchParams?.user || DEFAULT_USER
    ).getRepos({
      page: searchParams?.page || 1,
      per_page: 9,
      signal: abortController.signal,
    });

    return {
      repositories: data,
    };
  },
  validateSearch: (search?: Record<string, unknown>) => {
    // validate and parse the search params into a typed state
    return {
      page: Number(search?.page) || undefined,
      user: (search?.user as string) || undefined,
    };
  },
  loaderDeps: ({ search: { page, user } }) => ({ page, user }),
});

function Index() {
  const { repositories } = Route.useLoaderData();
  const { page } = Route.useSearch();

  if (repositories.code !== "success") {
    return <div>error</div>;
  }

  const getLastPageStringUrl = repositories.data?.headers?.link
    ?.split(",")
    .filter((link: string) => link.includes('rel="last"'))
    .at(0)
    ?.split(";")
    ?.at(0)
    .replace(/</g, "");
  const getLastPageNumberParam =
    Number(new URL(getLastPageStringUrl || "").searchParams.get("page")) || 1;
  console.log(getLastPageNumberParam);

  return (
    <div className="container mx-auto py-2">
      <Alert>Alert</Alert>
      <Suspense
        fallback={
          <Grid gridColSize={4} className="my-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </Grid>
        }
      >
        <ListRepositories repositories={repositories.data.response} />
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="/"
                disabled={page === 1}
                search={(prev: { page: number }) => ({ page: prev.page - 1 })}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="/"
                search={(prev: { page: number }) => ({ page: prev.page })}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="/"
                disabled={(page || 1) < getLastPageNumberParam}
                search={(prev: { page: number }) => ({ page: prev.page + 1 })}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Suspense>

      <div className="p-2">Hello from About!</div>
    </div>
  );
}
