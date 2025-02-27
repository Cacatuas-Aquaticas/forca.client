const fetchGame = async (date: string): Promise<string> => {
  const savedData = JSON.parse(localStorage.getItem(`game-${date}`) || '{}');

  if (savedData.word) return savedData.word;

  // Request API here
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("PARALELEPIPEDO");
    }, 100);
  });
};

export default fetchGame;
