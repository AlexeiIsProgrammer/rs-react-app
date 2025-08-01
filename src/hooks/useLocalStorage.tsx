type UseLocalStorageReturn = {
  value: string;
  setValue: (value: string) => void;
};

function useLocalStorage(key: string): UseLocalStorageReturn {
  const value: string = localStorage.getItem(key) || '';

  const setValue = (value: string) => localStorage.setItem(key, value);

  return { value, setValue } as const;
}

export default useLocalStorage;
