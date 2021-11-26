import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { config } from "./config";

const app = initializeApp(config);
export const storage = getStorage(app);
