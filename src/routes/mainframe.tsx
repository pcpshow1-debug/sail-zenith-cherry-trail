import { createFileRoute } from "@tanstack/react-router";
import { MainframeLanding } from "@/components/mainframe-landing";

const HEADING_FONT =
  "https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium";
const BODY_FONT =
  "https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg";

export const Route = createFileRoute("/mainframe")({
  head: () => ({
    meta: [
      { title: "Mainframe® — Creative Agency" },
      {
        name: "description",
        content:
          "Mainframe is a creative agency. Meet A.R.I.A, our Adaptive Response Interface Agent.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://db.onlinewebfonts.com" },
      { rel: "stylesheet", href: HEADING_FONT },
      { rel: "stylesheet", href: BODY_FONT },
    ],
  }),
  component: MainframeLanding,
});
