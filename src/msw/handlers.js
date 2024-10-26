import { http, HttpResponse } from "msw";
import { cardData } from "../utils/CardData";

export const storageKey = "cards";
export const storageValue = cardData;
const localStorageData = localStorage.getItem(storageKey) || null;
const saveData = (newData) => {
  localStorage.setItem(storageKey, JSON.stringify(newData));
};

export const handlers = [
  http.get("/api/cards", (req) => {
    const storedData = JSON.parse(
      localStorageData || JSON.stringify(storageValue)
    );
    return HttpResponse.json(storedData);
  }),

  http.post("/api/cards", (req, res, ctx) => {
    const newDocument = req.body;
    const updatedData = [...cardData, newDocument];
    saveData(updatedData);
    return HttpResponse.json(updatedData);
  }),
];
