import { NextRequest } from "next/server";
import { englishToNepali } from "@/lib/date_helper";
import {
  calculateNepaliYearProgress,
  generateMonthsGridJSON,
} from "@/lib/generator";
import {
  createOgImageResponse,
  getCurrentDateInNepal,
  getSecondsUntilNepalMidnight,
  imageGenerationErrorResponse,
  invalidDimensionsResponse,
  parseDimensionsFromRequestUrl,
} from "@/lib/og_image";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const dimensions = parseDimensionsFromRequestUrl(request.url);
    if (!dimensions) return invalidDimensionsResponse();

    const { width, height } = dimensions;
    const currentDateInNepal = getCurrentDateInNepal();
    const nepaliDate = englishToNepali(currentDateInNepal);

    const progress = calculateNepaliYearProgress(nepaliDate);
    const monthsGridResult = generateMonthsGridJSON(
      progress,
      nepaliDate,
      width,
      height,
    );

    const secondsUntilMidnight = getSecondsUntilNepalMidnight(currentDateInNepal);

    return createOgImageResponse(
      monthsGridResult,
      width,
      height,
      secondsUntilMidnight,
    );
  } catch (error) {
    return imageGenerationErrorResponse(error);
  }
}
