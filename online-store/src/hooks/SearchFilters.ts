import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [parsedParams, setParsedParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    setParsedParams(params);
  }, [searchParams]);

  const filterEmptyValues = (params: Record<string, string>) => {
    const filteredValues = { ...params };

    Object.keys(filteredValues).forEach((key) => {
      if (!filteredValues[key].length) {
        delete filteredValues[key];
      }
    });
    return filteredValues;
  };

  const toggleSearchParams = (key: string, value: string) => {
    const currentFilter = parsedParams[key];
    let newValues: string[] = [];

    if (currentFilter) {
      const values = currentFilter.split(',');

      if (values.includes(value)) {
        newValues = values.filter((el) => el != value);
      } else {
        newValues = [...values, value];
      }
    } else {
      newValues = [value];
    }
    const filteredParams = filterEmptyValues({
      ...parsedParams,
      [key]: newValues.join(','),
    });
    setSearchParams(filteredParams);
  };

  const updateSearchParams = (key: string, value: string) => {
    setSearchParams(filterEmptyValues({ ...parsedParams, [key]: value }));
  };

  return { toggleSearchParams, updateSearchParams };
};
