export const FAVOURITES_STORAGE_KEY = "favourite-photos";

export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      return state.includes(action.payload)
        ? state.filter((photoId) => photoId !== action.payload)
        : [...state, action.payload];
    default:
      return state;
  }
}

export function getInitialFavourites() {
  const savedFavourites = localStorage.getItem(FAVOURITES_STORAGE_KEY);

  if (!savedFavourites) {
    return [];
  }

  try {
    const parsedFavourites = JSON.parse(savedFavourites);
    return Array.isArray(parsedFavourites) ? parsedFavourites : [];
  } catch {
    return [];
  }
}
