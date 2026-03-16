export type Platform = "ios" | "android";

export type WallpaperType = "days" | "months" | "current-month";

export interface DeviceSpec {
  value: string;
  label: string;
  platform: Platform;
  width: number;
  height: number;
}
