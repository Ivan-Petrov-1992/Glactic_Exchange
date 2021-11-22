// useAxios hook
import { useState } from "react";
import axios from "axios";
import useInterval from "./useInterval";

const useAxios = ({ method, baseURL, interval = 2000 }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios[method](baseURL)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useInterval(() => {
    fetchData();
  }, interval);

  return { response, error, loading };
};

export default useAxios;
