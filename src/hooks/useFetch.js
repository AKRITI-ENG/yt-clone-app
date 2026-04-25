import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3001";

export function useFetch(endpoint, options = {}) {
  const { initialData = null, enabled = true } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");
  const requestUrl = useMemo(() => {
    if (!endpoint) {
      return "";
    }

    return endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  }, [endpoint]);

  useEffect(() => {
    if (!enabled || !requestUrl) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(requestUrl);

        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          const status = err?.response?.status;

          if (!err?.response) {
            setError(
              "Unable to reach the mock API. Start it with `npm run server` or run both apps together with `npm run dev:all`."
            );
          } else if (status === 404) {
            setError("Requested data was not found in the mock API.");
          } else {
            setError(err?.message || "Something went wrong while fetching data.");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [enabled, requestUrl]);

  return { data, loading, error };
}

export default useFetch;
