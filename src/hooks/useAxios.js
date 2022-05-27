import { useState, useEffect, useCallback } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3300";

const useAxios = (endpoint) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // custom hook returns value
  return { response, error, loading };
};

export default useAxios;
