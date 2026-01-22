import { Hono } from "hono";
import { z } from "zod/v4/mini";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import { englishToNepali, formatNepaliDate } from "./date_helper";
import {
  calculateNepaliYearProgress,
  generateDotsGridJSON,
  generateMonthsGridJSON,
} from "./generator";

const app = new Hono<{ Bindings: CloudflareBindings }>();

const schema = z.object({
  width: z.coerce.number(),
  height: z.coerce.number(),
});

app.get("/api/year-progress/days", async (c) => {
  try {
    const queryData = c.req.query();
    const validatedData = schema.safeParse(queryData);

    if (!validatedData.success) {
      return c.json({ error: validatedData.error.message }, 400);
    }

    const { width, height } = validatedData.data;

    const currentUTC = new Date();
    const currentDateInNepal = new Date(
      currentUTC.getTime() + 5 * 60 * 60 * 1000 + 45 * 60 * 1000,
    );
    const nepaliDate = englishToNepali(currentDateInNepal);
    const progress = calculateNepaliYearProgress(nepaliDate);
    const dotsGridResult = generateDotsGridJSON(progress, width, height);

    return new ImageResponse(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#1a1a1a",
            paddingTop: `${dotsGridResult.paddingValues.top}px`,
            paddingBottom: `${dotsGridResult.paddingValues.bottom}px`,
          },
          children: dotsGridResult.grid,
        },
      },
      {
        width,
        height,
      },
    );
  } catch (error) {
    console.error("Image generation error:", error);
    return c.json({ error: "Failed to generate image" }, 500);
  }
});

app.get("/api/year-progress/months", async (c) => {
  try {
    const queryData = c.req.query();
    const validatedData = schema.safeParse(queryData);

    if (!validatedData.success) {
      return c.json({ error: validatedData.error.message }, 400);
    }

    const { width, height } = validatedData.data;

    const currentUTC = new Date();
    const currentDateInNepal = new Date(
      currentUTC.getTime() + 5 * 60 * 60 * 1000 + 45 * 60 * 1000,
    );
    const nepaliDate = englishToNepali(currentDateInNepal);
    const progress = calculateNepaliYearProgress(nepaliDate);
    const monthsGridResult = generateMonthsGridJSON(
      progress,
      nepaliDate,
      width,
      height,
    );

    return new ImageResponse(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#1a1a1a",
            paddingTop: `${monthsGridResult.paddingValues.top}px`,
            paddingBottom: `${monthsGridResult.paddingValues.bottom}px`,
          },
          children: monthsGridResult.grid,
        },
      },
      {
        width,
        height,
      },
    );
  } catch (error) {
    console.error("Image generation error:", error);
    return c.json({ error: "Failed to generate image" }, 500);
  }
});

app.get("/api/year-progress", (c) => c.redirect("/api/year-progress/days"));

export default app;
