import { ImageResponse } from "@vercel/og";

const DEFAULT_WIDTH = 1170;
const DEFAULT_HEIGHT = 2532;
const NEPAL_UTC_OFFSET_MS = (5 * 60 + 45) * 60 * 1000;

type OgStyle = Record<string, string | number>;

export type OgElementNode = {
  type: string;
  props?: {
    style?: OgStyle;
    children?: unknown;
  };
};

export type OgNode = OgElementNode | string | number;

export type OgGridResult = {
  grid: OgElementNode;
  paddingValues: {
    top: number;
    bottom: number;
  };
};

export type OgRenderOptions = {
  backgroundImageUrl?: string;
  overlayAlpha?: number;
};

export type OgTextOptions = {
  handleText?: string;
};

export function parseDimensionsFromRequestUrl(requestUrl: string): {
  width: number;
  height: number;
} | null {
  const { searchParams } = new URL(requestUrl);
  const width = parseInt(searchParams.get("width") || `${DEFAULT_WIDTH}`, 10);
  const height = parseInt(
    searchParams.get("height") || `${DEFAULT_HEIGHT}`,
    10,
  );

  if (Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0) {
    return null;
  }

  return { width, height };
}

export function invalidDimensionsResponse() {
  return new Response(JSON.stringify({ error: "Invalid dimensions" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

export function parseOgRenderOptionsFromRequestUrl(
  requestUrl: string,
): OgRenderOptions {
  const { searchParams } = new URL(requestUrl);
  const backgroundImageUrl = searchParams.get("backgroundImageUrl")?.trim();
  const overlayAlphaParam = searchParams.get("overlayAlpha");
  const overlayAlpha = overlayAlphaParam ? Number(overlayAlphaParam) : undefined;

  return {
    backgroundImageUrl: backgroundImageUrl || undefined,
    overlayAlpha:
      overlayAlpha !== undefined && Number.isFinite(overlayAlpha)
        ? Math.min(1, Math.max(0, overlayAlpha))
        : undefined,
  };
}

export function parseOgTextOptionsFromRequestUrl(requestUrl: string): OgTextOptions {
  const { searchParams } = new URL(requestUrl);
  const handleText = searchParams.get("handleText")?.trim();

  return {
    handleText: handleText || undefined,
  };
}

export function getCurrentDateInNepal() {
  const currentUTC = new Date();
  return new Date(currentUTC.getTime() + NEPAL_UTC_OFFSET_MS);
}

export function getSecondsUntilNepalMidnight(currentDateInNepal: Date) {
  const nepalMidnight = new Date(currentDateInNepal);
  nepalMidnight.setHours(24, 0, 0, 0);
  return Math.max(
    60,
    Math.floor((nepalMidnight.getTime() - currentDateInNepal.getTime()) / 1000),
  );
}

export function createOgImageResponse(
  gridResult: OgGridResult,
  width: number,
  height: number,
  secondsUntilMidnight: number,
  options?: OgRenderOptions,
) {
  const overlayAlpha = options?.overlayAlpha ?? 0;
  const backgroundImageUrl = options?.backgroundImageUrl;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: backgroundImageUrl ? "#000000" : "#1a1a1a",
        backgroundImage: backgroundImageUrl
          ? `url("${backgroundImageUrl}")`
          : undefined,
        backgroundSize: backgroundImageUrl ? "cover" : undefined,
        backgroundPosition: backgroundImageUrl ? "center" : undefined,
        paddingTop: `${gridResult.paddingValues.top}px`,
        paddingBottom: `${gridResult.paddingValues.bottom}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: `rgba(0, 0, 0, ${overlayAlpha})`,
        }}
      >
        {renderOgElement(gridResult.grid)}
      </div>
    </div>,
    {
      width,
      height,
      headers: {
        "Cache-Control": `public, s-maxage=${secondsUntilMidnight}, stale-while-revalidate=60`,
      },
    },
  );
}

export function imageGenerationErrorResponse(error: unknown) {
  console.error("Image generation error:", error);
  return new Response(JSON.stringify({ error: "Failed to generate image" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}

export function renderOgElement(
  element: OgNode | null | undefined,
  key?: number,
): React.ReactNode {
  if (!element) return null;

  if (typeof element === "string" || typeof element === "number") {
    return element;
  }

  const { type, props } = element;
  if (!props) return null;

  const { style, children } = props;

  if (type === "text") {
    const textChildren = renderOgChildren(children);
    return (
      <div key={key} style={{ display: "flex", ...style }}>
        {textChildren}
      </div>
    );
  }

  const childElements = renderOgChildren(children);

  if (type === "div") {
    return (
      <div key={key} style={style}>
        {childElements}
      </div>
    );
  }

  return null;
}

function renderOgChildren(children: unknown): React.ReactNode {
  if (!children) return null;

  if (Array.isArray(children)) {
    return children.map((child, index) =>
      renderOgElement(child as OgNode | null | undefined, index),
    );
  }

  if (typeof children === "string" || typeof children === "number") {
    return children;
  }

  if (typeof children === "object") {
    return renderOgElement(children as OgNode);
  }

  return null;
}
