import { SimpleGrid } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";

function GameGrid() {
  const { games, error } = useGames();
  return (
    <>
      {error && <h1>{error}</h1>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={10}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game}></GameCard>
        ))}
      </SimpleGrid>
    </>
  );
}

export default GameGrid;
