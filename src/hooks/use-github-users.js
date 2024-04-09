import { useState, useEffect } from "react";

const useGitHubUsers = ({ search, page, perPage }) => {
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryString = `q=${encodeURIComponent(
          `${search} type:User in:login,name`
        )}&per_page=${perPage}&page=${page}`;

        const url = `https://api.github.com/search/users?${queryString}`;

        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        setData({ items: result?.items, total: result?.total_count });
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, page, perPage]);

  return { data: data.items, total: data.total, loading, error };
};

export default useGitHubUsers;
