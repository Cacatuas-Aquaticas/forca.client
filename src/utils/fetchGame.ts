const fetchGame = async (date: string): Promise<string> => {
  const savedData = JSON.parse(localStorage.getItem(`game-${date}`) || "{}");

  if (savedData.word) return savedData.word;

  // Request API here
  const response = await fetch(`/api/game/${date}`);
  const data = await response.json();
  return data.word.toUpperCase();
};

export default fetchGame;
