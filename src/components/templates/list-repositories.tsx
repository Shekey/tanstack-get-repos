import { FC } from "react";
import { Repo } from "@/lib/repository/github/types";
import { Grid } from "../common/Grid";
import { RepositoryCard } from "../common/RepositoryCard";

interface ListRepositoriesProps {
  repositories: Repo[];
}

export const ListRepositories: FC<ListRepositoriesProps> = ({
  repositories,
}) => {
  return (
    <Grid gridColSize={4} className="my-10 gap-5">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}
    </Grid>
  );
};
