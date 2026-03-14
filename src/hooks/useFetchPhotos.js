import { useEffect, useState } from "react";

const PHOTOS_URL = "https://picsum.photos/v2/list?limit=30";

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchPhotos() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(PHOTOS_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch photos.");
        }

        const data = await response.json();

        if (!ignore) {
          setPhotos(data);
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(fetchError.message || "Something went wrong while fetching photos.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      ignore = true;
    };
  }, []);

  return { photos, loading, error };
}
