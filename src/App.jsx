import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import Gallery from "./components/Gallery";
import useFetchPhotos from "./hooks/useFetchPhotos";
import {
  favouritesReducer,
  FAVOURITES_STORAGE_KEY,
  getInitialFavourites,
} from "./reducers/favouritesReducer";

function Spinner() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4">
      <div className="relative h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
        Loading Photos
      </p>
    </div>
  );
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, dispatch] = useReducer(favouritesReducer, [], getInitialFavourites);

  useEffect(() => {
    localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: photoId });
  }, []);

  const filteredPhotos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return photos;
    }

    return photos.filter((photo) => photo.author.toLowerCase().includes(normalizedSearch));
  }, [photos, searchTerm]);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8 lg:p-10">
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" />

          <div className="relative">
            <header className="max-w-3xl">
              <h1 className="text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                Photo Gallery Web App
              </h1>
            </header>

            <div className="mt-6 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4 shadow-inner shadow-white sm:p-5">
              <label
                htmlFor="search"
                className="mb-3 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
              >
                Search by author
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Start typing an author name"
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
              />
            </div>
          </div>
        </section>

        {loading ? <Spinner /> : null}

        {!loading && error ? (
          <div className="rounded-[1.75rem] border border-red-200 bg-white p-6 text-sm text-red-600 shadow-[0_18px_60px_rgba(220,38,38,0.08)]">
            {error}
          </div>
        ) : null}

        {!loading && !error && filteredPhotos.length === 0 ? (
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            No photos match your search.
          </div>
        ) : null}

        {!loading && !error && filteredPhotos.length > 0 ? (
          <Gallery
            photos={filteredPhotos}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
          />
        ) : null}
      </div>
    </main>
  );
}
