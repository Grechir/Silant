import { useEffect, useState } from "react";
import { fetchWithToken } from "../utils/login/api";
import {GROUPS} from "../configs/groupsConfig";

export const useDirectoryOptions = () => {
  const [optionsMap, setOptionsMap] = useState({});

  useEffect(() => {
    (async () => {
      const result = {};
      for (const group of GROUPS) {
        const url = `http://127.0.0.1:8000/api/directory/?entity=${encodeURIComponent(group)}`;
        const data = await fetchWithToken(url);
        result[group] = data.results || [];
      }
      setOptionsMap(result);
    })();
  }, []);

  return optionsMap;
};
