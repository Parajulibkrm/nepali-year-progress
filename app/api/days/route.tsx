import type { NextRequest } from "next/server";
import { englishToNepali } from "@/lib/date_helper";
import {
  calculateNepaliYearProgress,
  generateDotsGridJSON,
} from "@/lib/generator";
import {
  createOgImageResponse,
  getCurrentDateInNepal,
  getSecondsUntilNepalMidnight,
  imageGenerationErrorResponse,
  invalidDimensionsResponse,
  parseDimensionsFromRequestUrl,
  parseOgRenderOptionsFromRequestUrl,
  parseOgTextOptionsFromRequestUrl,
} from "@/lib/og_image";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const dimensions = parseDimensionsFromRequestUrl(request.url);
    if (!dimensions) return invalidDimensionsResponse();
    const renderOptions = parseOgRenderOptionsFromRequestUrl(request.url);
    const textOptions = parseOgTextOptionsFromRequestUrl(request.url);

    const { width, height } = dimensions;
    const currentDateInNepal = getCurrentDateInNepal();
    const nepaliDate = englishToNepali(currentDateInNepal);

    const progress = calculateNepaliYearProgress(nepaliDate);
    const dotsGridResult = generateDotsGridJSON(
      progress,
      nepaliDate,
      width,
      height,
      textOptions,
    );

    const secondsUntilMidnight = getSecondsUntilNepalMidnight(currentDateInNepal);

    return createOgImageResponse(
      dotsGridResult,
      width,
      height,
      secondsUntilMidnight,
      renderOptions,
    );
  } catch (error) {
    return imageGenerationErrorResponse(error);
  }
}
