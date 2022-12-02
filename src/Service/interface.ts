export interface ILocalStorageService {
  getLocalStorage: <TData>() => TData | null;
  setLocalStorage: <TData>(item: TData) => void;
  removeLocalStorage: () => void;
}
