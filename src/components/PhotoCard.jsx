function HeartIcon({ active }) {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 21s-6.716-4.35-9.192-8.336C.488 9.017 2.19 4.5 6.84 4.5c2.194 0 3.763 1.177 4.66 2.61.897-1.433 2.466-2.61 4.66-2.61 4.65 0 6.352 4.517 4.032 8.164C18.716 16.65 12 21 12 21Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.16)]">
      <div className="relative overflow-hidden">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/400`}
          alt={`Captured by ${photo.author}`}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className={`absolute right-4 top-4 inline-flex items-center justify-center rounded-full border p-3 backdrop-blur transition ${
            isFavourite
              ? "border-rose-200 bg-white/90 text-rose-500 shadow-sm"
              : "border-white/70 bg-white/80 text-slate-500 hover:bg-white hover:text-slate-700"
          }`}
        >
          <HeartIcon active={isFavourite} />
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 via-slate-900/25 to-transparent px-5 pb-5 pt-12">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/70">Author</p>
          <h2 className="mt-2 text-lg font-semibold leading-snug text-white">{photo.author}</h2>
        </div>
      </div>
    </article>
  );
}
