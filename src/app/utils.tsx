import { GridCell } from "./hooks/useDailyPuzzle";

export const generateRandomColor = (colors: string[]): string => {
  return colors[Math.floor(Math.random() * colors.length)];
}

export const generateGrid = () => {
  let colors = ['red', 'green', 'yellow', 'orange'];
  const colorCount = {
    red: 0,
    green: 0,
    yellow: 0,
    orange: 0,
  }
  const newGrid: GridCell[][] = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => { return { color: '', isFrozen: false } }));

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      const color = generateRandomColor(colors);
      newGrid[i][j].color = color;

      if (colorCount[color as keyof typeof colorCount] + 1 == 4) {
        colors.splice(colors.indexOf(color), 1);
      } else {
        colorCount[color as keyof typeof colorCount]++;
      }
    }
  }
  return newGrid;
}

export const getShareableEmojiScore = (grid: GridCell[][]) => {
  const emojiScore = grid.map(row => row.map(cell => {
    switch (cell.color) {
      case 'red':
        return '🟥';
      case 'green':
        return '🟩';
      case 'yellow':
        return '🟨';
      case 'orange':
        return '🟧';
    }
  }).join('')).join('\n');

  return emojiScore;
}

export const isNewDay = () => {
  if (typeof window !== 'undefined') {
    const lastVisitDate = localStorage.getItem('lastVisit');
    if (lastVisitDate === null) {
      return true;
    } else {
      return new Date(JSON.parse(lastVisitDate)).getDate() !== new Date().getDate();
    }
  }
}

export const isNewHour = () => {
  if (typeof window !== 'undefined') {
    const lastVisitDate = localStorage.getItem('lastVisit');
    if (lastVisitDate === null) {
      return true;
    } else {
      const oldDate = new Date(JSON.parse(lastVisitDate))
      const newDate = new Date()
      return oldDate.getHours() !== newDate.getHours() && oldDate.getDate() !== newDate.getDate();
    }
  }
}

export const getLocalStorageOrDefault = (key: string, defaultValue: any) => {
  if (typeof window !== 'undefined') {
    if (isNewDay()) {
      console.log("reseting")
      // reset for new day, we can update this if we want to store any stats
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    else {
      console.log("getting local storage")
      const storedValue = localStorage.getItem(key);
      console.log(storedValue)
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      else {
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

export const setLocalStorageAndState = (key: string, newValue: any, setter: React.Dispatch<React.SetStateAction<any>>) => {
  setter(newValue);
  localStorage.setItem(key, JSON.stringify(newValue));
}

export const isNewVisitor = () => {
  if (typeof window !== 'undefined') {
    const lastVisitDate = localStorage.getItem('lastVisit');
    if (lastVisitDate === null) {
      return true;
    }
    return false;
  }
}
