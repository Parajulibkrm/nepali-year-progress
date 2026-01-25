import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { englishToNepali } from "@/lib/date_helper";
import {
  calculateNepaliYearProgress,
  generateMonthsGridJSON,
} from "@/lib/generator";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const width = parseInt(searchParams.get("width") || "1170");
    const height = parseInt(searchParams.get("height") || "2532");

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return new Response(JSON.stringify({ error: "Invalid dimensions" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const currentUTC = new Date();
    const currentDateInNepal = new Date(
      currentUTC.getTime() + 5 * 60 * 60 * 1000 + 45 * 60 * 1000
    );
    const nepaliDate = englishToNepali(currentDateInNepal);

    const progress = calculateNepaliYearProgress(nepaliDate);
    const monthsGridResult = generateMonthsGridJSON(
      progress,
      nepaliDate,
      width,
      height
    );

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#1a1a1a",
            paddingTop: `${monthsGridResult.paddingValues.top}px`,
            paddingBottom: `${monthsGridResult.paddingValues.bottom}px`,
          }}
        >
          {renderElement(monthsGridResult.grid)}
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (error) {
    console.error("Image generation error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderElement(element: any, key?: number): React.ReactNode {
  if (!element) return null;

  if (typeof element === "string" || typeof element === "number") {
    return element;
  }

  const { type, props } = element;
  if (!props) return null;

  const { style, children } = props;

  // Handle text type - render as div with styles (satori doesn't support span well)
  if (type === "text") {
    return <div key={key} style={{ display: "flex", ...style }}>{children}</div>;
  }

  // Process children
  let childElements: React.ReactNode = null;
  if (Array.isArray(children)) {
    childElements = children.map((child: unknown, index: number) =>
      renderElement(child, index)
    );
  } else if (children) {
    childElements = renderElement(children);
  }

  if (type === "div") {
    return <div key={key} style={style}>{childElements}</div>;
  }

  return null;
}
