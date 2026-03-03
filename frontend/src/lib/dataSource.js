import { apiList } from "./api";

export async function loadWithFallback(path, fallbackData, mapFn = (x) => x) {
  try {
    const data = await apiList(path);
    // Si l'API renvoie un tableau vide ou un truc bizarre, on fallback
    if (!Array.isArray(data) || data.length === 0) return mapFn(fallbackData);
    return mapFn(data);
  } catch (e) {
    return mapFn(fallbackData);
  }
}