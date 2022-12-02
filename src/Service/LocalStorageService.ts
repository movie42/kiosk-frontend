import { LOCAL_STORAGE_KEY } from "@/lib/constant/constant";
import type { ILocalStorageService } from "./interface";

class LocalStorageService implements ILocalStorageService {
  getLocalStorage<TData>() {
    const getStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (getStorage !== null) {
      const item: TData = JSON.parse(getStorage);
      return item;
    }
    return null;
  }

  setLocalStorage<TData>(item: TData) {
    const stringifyItem = JSON.stringify(item);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifyItem);
  }

  removeLocalStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

export default LocalStorageService;
