import {
  getDaysInMonth,
  getDaysInYear,
  formatNepaliDate,
  type NepaliDate,
} from "./date_helper";

function getLastDayOfNepaliMonth(year: number, month: number): number {
  try {
    return getDaysInMonth(year, month);
  } catch (e) {
    return 29; // fallback
  }
}

export function calculateNepaliYearProgress(currentNepaliDate: NepaliDate) {
  const { year, month, day } = currentNepaliDate;

  let dayOfYear = 0;

  for (let m = 1; m < month; m++) {
    dayOfYear += getLastDayOfNepaliMonth(year, m);
  }

  dayOfYear += day;

  const totalDaysInYear = getDaysInYear(year);

  const daysPassed = dayOfYear - 1; // Current day is not fully passed

  return {
    totalDays: totalDaysInYear,
    daysPassed,
    currentDay: dayOfYear,
    remainingDays: totalDaysInYear - dayOfYear,
  };
}

// Lock screen safe zones (percentage of height)
const TOP_PADDING_PERCENT = 25; // Space for clock + date
const BOTTOM_PADDING_PERCENT = 12; // Space for action buttons + home indicator

export function generateDotsGridJSON(
  progress: ReturnType<typeof calculateNepaliYearProgress>,
  screenWidth: number,
  screenHeight: number,
) {
  const { totalDays, currentDay, remainingDays } = progress;

  // Calculate padding based on screen height
  const topPadding = Math.round((screenHeight * TOP_PADDING_PERCENT) / 100);
  const bottomPadding = Math.round(
    (screenHeight * BOTTOM_PADDING_PERCENT) / 100,
  );

  const textHeight = Math.max(screenHeight * 0.05, 24);
  const fontSize = Math.max(screenHeight * 0.015, 16);

  const availableHeight =
    screenHeight - topPadding - bottomPadding - textHeight - 40;

  const availableWidth = screenWidth;

  const cols = 15;
  const rows = 25;

  // Calculate cell dimensions
  const cellWidth = availableWidth / cols;
  const cellHeight = availableHeight / rows;

  // Use the smaller dimension to ensure square dots that fit
  const cellSize = Math.min(cellWidth, cellHeight);
  const dotSize = cellSize * 0.6;
  const gap = cellSize - dotSize;

  const dots = [];

  let currentDayIndex = currentDay - 1;

  for (let day = 0; day < cols * rows; day++) {
    const isPassed = day < currentDayIndex;
    const isCurrent = day === currentDayIndex;
    const isInYear = day < totalDays;

    dots.push({
      type: "div",
      props: {
        style: {
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: isCurrent ? "red" : "white",
          borderRadius: "50%",
          margin: `${gap / 2}px`,
          opacity: isPassed || isCurrent ? 1 : isInYear ? 0.3 : 0,
        },
      },
    });
  }

  const gridWidth = cols * cellSize + cellSize;

  // Calculate percentage
  const progressPercent = Math.round((currentDay / totalDays) * 100);

  // Create progress text with responsive sizing
  const progressText = {
    type: "div",
    props: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        width: "100%",
      },
      children: {
        type: "text",
        props: {
          style: {
            color: "gray",
            fontSize: `${fontSize}px`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: "500",
            textAlign: "center",
          },
          children: `${remainingDays}d left • ${progressPercent}%`,
        },
      },
    },
  };

  return {
    grid: {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                width: `${gridWidth}px`,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              },
              children: dots,
            },
          },
          progressText,
        ],
      },
    },
    paddingValues: {
      top: topPadding,
      bottom: bottomPadding,
    },
  };
}
