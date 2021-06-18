import Zode from "@zopsmart/zode";
import finalRoutes from "./routes";

export const app: Zode = new Zode();

app.registerRoutes(finalRoutes);

app.start(9100);
