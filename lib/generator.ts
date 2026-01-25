import {
  getDaysInMonth,
  getDaysInYear,
  formatNepaliDate,
  getNepaliDayOfWeek,
  type NepaliDate,
  NEPALI_MONTHS,
} from "./date_helper";

function getLastDayOfNepaliMonth(year: number, month: number): number {
  try {
    return getDaysInMonth(year, month);
  } catch (e) {
    return 29;
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

  const daysPassed = dayOfYear - 1;

  return {
    totalDays: totalDaysInYear,
    daysPassed,
    currentDay: dayOfYear,
    remainingDays: totalDaysInYear - dayOfYear,
  };
}

function getMonthStartingDays(nepaliYear: number): number[] {
  const monthStartDays: number[] = [];

  for (let month = 1; month <= 12; month++) {
    const firstDayOfMonth: NepaliDate = {
      year: nepaliYear,
      month: month,
      day: 1,
    };
    const dayOfWeek = getNepaliDayOfWeek(firstDayOfMonth);
    monthStartDays[month] = dayOfWeek;
  }

  return monthStartDays;
}

const TOP_PADDING_PERCENT = 25;
const BOTTOM_PADDING_PERCENT = 12;

export function generateDotsGridJSON(
  progress: ReturnType<typeof calculateNepaliYearProgress>,
  currentNepaliDate: NepaliDate,
  screenWidth: number,
  screenHeight: number,
) {
  const { totalDays, currentDay, remainingDays } = progress;

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

  const cellWidth = availableWidth / cols;
  const cellHeight = availableHeight / rows;

  const cellSize = Math.min(cellWidth, cellHeight);
  const dotSize = cellSize * 0.5;
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

  const progressPercent = Math.round((currentDay / totalDays) * 100);

  const dateText = {
    type: "div",
    props: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "8px",
        width: "100%",
      },
      children: {
        type: "text",
        props: {
          style: {
            color: "gray",
            fontSize: `${fontSize}px`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: "400",
            textAlign: "center",
          },
          children: formatNepaliDate(currentNepaliDate, "MMMM DD, YYYY"),
        },
      },
    },
  };

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
          dateText,
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

export function generateMonthsGridJSON(
  progress: ReturnType<typeof calculateNepaliYearProgress>,
  currentNepaliDate: NepaliDate,
  screenWidth: number,
  screenHeight: number,
) {
  const { totalDays, remainingDays, currentDay } = progress;

  const topPadding = Math.round((screenHeight * TOP_PADDING_PERCENT) / 100);
  const bottomPadding = Math.round(
    (screenHeight * BOTTOM_PADDING_PERCENT) / 100,
  );

  const textHeight = Math.max(screenHeight * 0.05, 24);
  const fontSize = Math.max(screenHeight * 0.015, 16);
  const monthTitleFontSize = Math.max(screenHeight * 0.012, 14);

  const availableHeight =
    screenHeight - topPadding - bottomPadding - textHeight - 40;
  const availableWidth = screenWidth * 0.85;

  const monthCols = 3;
  const monthRows = 4;
  const monthGap = Math.max(screenWidth * 0.04, 16);

  const monthWidth = Math.floor(
    (availableWidth - monthGap * (monthCols - 1)) / monthCols,
  );
  const monthHeight = Math.floor(
    (availableHeight - monthGap * (monthRows - 1)) / monthRows,
  );

  const dayCols = 7;
  const dayRows = 5;

  const dayCellWidth = monthWidth / dayCols;
  const dayCellHeight = (monthHeight * 0.75) / dayRows;

  const dayCellSize = Math.floor(Math.min(dayCellWidth, dayCellHeight));
  const dotSize = Math.floor(dayCellSize * 0.5);
  const gap = dayCellSize - dotSize;
  const dotMargin = Math.floor(gap / 2);

  const months = [];

  const monthStartingDays = getMonthStartingDays(currentNepaliDate.year);

  for (let m = 1; m <= 12; m++) {
    const daysInThisMonth = getDaysInMonth(currentNepaliDate.year, m);
    const monthDots = [];

    const actualStartingDay = monthStartingDays[m];

    for (let emptyDay = 0; emptyDay < actualStartingDay; emptyDay++) {
      monthDots.push({
        type: "div",
        props: {
          style: {
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            margin: `${dotMargin}px`,
            opacity: 0,
          },
        },
      });
    }

    // Create dots for actual days in the month
    for (let d = 1; d <= daysInThisMonth; d++) {
      let isPassed = false;
      let isCurrent = false;

      if (m < currentNepaliDate.month) {
        isPassed = true;
      } else if (m === currentNepaliDate.month) {
        if (d < currentNepaliDate.day) {
          isPassed = true;
        } else if (d === currentNepaliDate.day) {
          isCurrent = true;
        }
      }

      monthDots.push({
        type: "div",
        props: {
          style: {
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: isCurrent ? "red" : "white",
            borderRadius: "50%",
            margin: `${dotMargin}px`,
            opacity: isPassed || isCurrent ? 1 : 0.2,
          },
        },
      });
    }

    months.push({
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: `${monthWidth}px`,
          height: `${monthHeight}px`,
          flexShrink: 0,
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                color: "gray",
                fontSize: `${monthTitleFontSize}px`,
                fontFamily: "system-ui, -apple-system, sans-serif",
                marginBottom: "16px",
                width: `${7 * (dotSize + 2 * dotMargin)}px`,
                textAlign: "left",
                paddingLeft: `${dotMargin}px`,
              },
              children: NEPALI_MONTHS[m - 1],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: `${7 * (dotSize + 2 * dotMargin)}px`,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              },
              children: monthDots,
            },
          },
        ],
      },
    });
  }

  const progressPercent = Math.round((currentDay / totalDays) * 100);

  const dateText = {
    type: "div",
    props: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "8px",
        width: "100%",
      },
      children: {
        type: "text",
        props: {
          style: {
            color: "gray",
            fontSize: `${fontSize}px`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: "400",
            textAlign: "center",
          },
          children: formatNepaliDate(currentNepaliDate, "MMMM DD, YYYY"),
        },
      },
    },
  };

  const progressText = {
    type: "div",
    props: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "16px",
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
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                width: `${availableWidth}px`,
                gap: `${monthGap}px`,
              },
              children: months,
            },
          },
          dateText,
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
