import { useState, useEffect } from "react";

const useGitHubUserDetails = (login) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${login}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setData(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [login]);

  return { data, loading, error };
};

export default useGitHubUserDetails;
