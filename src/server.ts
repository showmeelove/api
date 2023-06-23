import { App } from "@/app";
import { WaitlistRoute } from "./routes/waitlist.route";
import { AuthRoute } from "./routes/auth.route";

new App(3000, [
  new WaitlistRoute(),
  new AuthRoute()
])