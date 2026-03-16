import { useState, useMemo } from "react";
import { CheckIcon, ChevronsUpDownIcon, Copy, CopyCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import copy from "copy-to-clipboard";
import {
  type DeviceSpec as Device,
  type Platform,
  type WallpaperType,
} from "@/lib/types";

interface DeviceSetupProps {
  platform: Platform;
  devices: Device[];
  wallpaperType: WallpaperType;
  onBack: () => void;
  onClose: () => void;
}

function getWallpaperEndpoint(wallpaperType: WallpaperType) {
  if (wallpaperType === "days") return "days";
  if (wallpaperType === "months") return "months";
  return "current-month";
}

export function DeviceSetup({
  platform,
  devices,
  wallpaperType,
  onBack,
  onClose,
}: DeviceSetupProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [comboboxOpen, setComboboxOpen] = useState(false);

  // Initialize selected device with default based on platform
  const [selectedDevice, setSelectedDevice] = useState(() => {
    const defaultDeviceValue =
      platform === "ios" ? "iphone_16_pro" : "samsung_galaxy_s25_ultra";
    const deviceExists = devices.some((d) => d.value === defaultDeviceValue);
    return deviceExists ? defaultDeviceValue : "";
  });

  const [copied, setCopied] = useState(false);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const platformDevices = useMemo(() => {
    return devices.filter((d) => d.platform === platform);
  }, [platform, devices]);

  const filteredDevices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return platformDevices;

    const normalizedQuery = query.replace(/[_/\s+-]+/g, " ");

    return platformDevices.filter((d) => {
      const normalizedLabel = d.label.toLowerCase().replace(/[_/\s+-]+/g, " ");
      const normalizedValue = d.value.toLowerCase().replace(/[_/\s+-]+/g, " ");
      return (
        normalizedLabel.includes(normalizedQuery) ||
        normalizedValue.includes(normalizedQuery)
      );
    });
  }, [searchQuery, platformDevices]);

  const selectedDeviceDetails = useMemo(() => {
    return platformDevices.find((d) => d.value === selectedDevice);
  }, [selectedDevice, platformDevices]);

  const selectedDeviceLabel = selectedDeviceDetails?.label ?? "Select your device";

  const wallpaperUrl = useMemo(() => {
    if (useCustom && customWidth && customHeight) {
      const width = parseInt(customWidth, 10);
      const height = parseInt(customHeight, 10);
      if (width > 0 && height > 0) {
        const endpoint = getWallpaperEndpoint(wallpaperType);
        return `${window.location.origin}/api/${endpoint}?width=${width}&height=${height}`;
      }
    }
    if (!selectedDeviceDetails) return "";
    const endpoint = getWallpaperEndpoint(wallpaperType);
    return `${window.location.origin}/api/${endpoint}?width=${selectedDeviceDetails.width}&height=${selectedDeviceDetails.height}`;
  }, [
    selectedDeviceDetails,
    wallpaperType,
    useCustom,
    customWidth,
    customHeight,
  ]);

  const handleCopyUrl = async () => {
    try {
      copy(wallpaperUrl);
      setCopied(true);
      toast.success("URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy URL", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {platform === "ios" ? "iOS Setup" : "Android Setup"}
        </DialogTitle>
        <DialogDescription>
          {platform === "ios"
            ? "Use iPhone Shortcuts to automatically update your lock screen daily."
            : "Use MacroDroid to automatically update your lock screen daily."}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 mt-4 overflow-x-hidden">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 rounded">
              1
            </div>
            <h3 className="font-semibold">Select Your Device</h3>
          </div>
          <div className="ml-10 space-y-3">
            <Popover
              open={comboboxOpen}
              onOpenChange={(open) => {
                setComboboxOpen(open);
                if (!open) setSearchQuery("");
              }}
              modal={true}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboboxOpen}
                  className="w-full justify-between h-11 flex"
                >
                  <span className="flex-1 truncate text-left">
                    {useCustom
                      ? "Custom Device"
                      : selectedDevice
                        ? selectedDeviceLabel
                        : "Select your device"}
                  </span>
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Search for your phone model..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No device found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="custom"
                        className="data-selected:bg-transparent"
                        onSelect={(currentValue) => {
                          if (currentValue === "custom") {
                            setUseCustom(true);
                            setSelectedDevice("");
                          } else {
                            setUseCustom(false);
                            setSelectedDevice(
                              currentValue === selectedDevice
                                ? ""
                                : currentValue,
                            );
                          }
                          setSearchQuery("");
                          setComboboxOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={`mr-2 h-4 w-4 ${useCustom ? "opacity-100" : "opacity-0"}`}
                        />
                        Custom Device
                      </CommandItem>
                      {filteredDevices.map((device) => (
                        <CommandItem
                          key={device.value}
                          value={device.value}
                          className="data-selected:bg-transparent"
                          onSelect={(currentValue) => {
                            setUseCustom(false);
                            setSelectedDevice(
                              currentValue === selectedDevice
                                ? ""
                                : currentValue,
                            );
                            setSearchQuery("");
                            setComboboxOpen(false);
                          }}
                        >
                          <CheckIcon
                            className={`mr-2 h-4 w-4 ${selectedDevice === device.value ? "opacity-100" : "opacity-0"}`}
                          />
                          {device.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {useCustom && (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="custom-width">Width (px)</Label>
                    <Input
                      id="custom-width"
                      type="number"
                      placeholder="e.g., 1080"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-height">Height (px)</Label>
                    <Input
                      id="custom-height"
                      type="number"
                      placeholder="e.g., 1920"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                      min="1"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter your device&apos;s screen resolution. You can find this
                  in your device settings or by searching online for your device
                  model.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 rounded">
              2
            </div>
            <h3 className="font-semibold">
              {platform === "android"
                ? "Install MacroDroid"
                : "Create Automation"}
            </h3>
          </div>
          {platform === "android" ? (
            <div className="ml-10 bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Install{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.arlosoft.macrodroid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-medium underline underline-offset-2"
                >
                  MacroDroid
                </a>{" "}
                from Google Play Store.
              </p>
            </div>
          ) : (
            <div className="ml-10 bg-muted p-4 rounded-lg">
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>
                  Open{" "}
                  <a
                    href="shortcuts://"
                    className="text-foreground font-medium underline underline-offset-2"
                  >
                    Shortcuts
                  </a>{" "}
                  app
                </li>
                <li>
                  Go to{" "}
                  <span className="text-foreground font-medium">
                    Automation
                  </span>{" "}
                  tab
                </li>
                <li>
                  Tap{" "}
                  <span className="text-foreground font-medium">
                    New Automation
                  </span>
                </li>
                <li>
                  Select{" "}
                  <span className="text-foreground font-medium">
                    Time of Day
                  </span>
                </li>
                <li>
                  Set time to{" "}
                  <span className="text-foreground font-medium">6:00 AM</span>
                </li>
                <li>
                  Set Repeat to{" "}
                  <span className="text-foreground font-medium">
                    &quot;Daily&quot;
                  </span>
                </li>
                <li>
                  Select{" "}
                  <span className="text-foreground font-medium">
                    &quot;Run Immediately&quot;
                  </span>
                </li>
                <li>
                  Tap{" "}
                  <span className="text-foreground font-medium">
                    &quot;Create New Shortcut&quot;
                  </span>
                </li>
              </ol>
            </div>
          )}
        </div>

        <div className="space-y-3 overflow-x-hidden">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 rounded">
              3
            </div>
            <h3 className="font-semibold">
              {platform === "android" ? "Setup Macro" : "Create Shortcut"}
            </h3>
          </div>
          <div className="ml-10 bg-muted p-4 rounded-lg">
            {platform === "android" ? (
              <div className="text-sm text-muted-foreground space-y-3">
                <ol className="space-y-1 list-decimal list-inside">
                  <li>
                    Open{" "}
                    <span className="text-foreground font-medium">
                      MacroDroid
                    </span>
                  </li>
                  <li>
                    Tap{" "}
                    <span className="text-foreground font-medium">
                      Add Macro
                    </span>
                  </li>
                </ol>
                <div>
                  <span className="text-foreground font-medium">Trigger:</span>
                  <ol className="mt-1 space-y-1 list-decimal list-inside ml-4">
                    <li>
                      Select{" "}
                      <span className="text-foreground font-medium">
                        Date/Time
                      </span>
                    </li>
                    <li>
                      Choose{" "}
                      <span className="text-foreground font-medium">
                        Day/Time
                      </span>
                    </li>
                    <li>
                      Set time to{" "}
                      <span className="text-foreground font-medium">
                        00:01:00
                      </span>
                    </li>
                    <li>
                      Activate{" "}
                      <span className="text-foreground font-medium">
                        all weekdays
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Follow the standard shortcut creation steps to create a shortcut
                that runs the actions below.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3 overflow-x-hidden">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 rounded">
              4
            </div>
            <h3 className="font-semibold">
              {platform === "android"
                ? "Configure Actions"
                : "Shortcut Actions"}
            </h3>
          </div>
          <div className="ml-10 bg-muted p-4 rounded-lg space-y-4 overflow-x-hidden">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Add these actions:
            </p>

            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-muted-foreground text-sm shrink-0">
                  {platform === "android" ? "4.1" : "3.1"}
                </span>
                <div className="text-sm space-y-2 wrap-break-word flex-1 w-full">
                  <p className="font-medium">
                    {platform === "ios"
                      ? '"Get Contents of URL"'
                      : "Download Image"}
                  </p>
                  {platform === "ios" && (
                    <ol className="text-muted-foreground space-y-1 list-decimal list-inside text-sm">
                      <li>Paste the following URL:</li>
                    </ol>
                  )}
                  {platform === "android" && (
                    <ul className="text-muted-foreground space-y-1 list-disc list-inside text-sm">
                      <li>
                        Go to{" "}
                        <span className="text-foreground font-medium">
                          Web Interactions
                        </span>{" "}
                        →{" "}
                        <span className="text-foreground font-medium">
                          HTTP Request
                        </span>
                      </li>
                      <li>
                        Request method:{" "}
                        <span className="text-foreground font-medium">GET</span>
                      </li>
                      <li>Paste the URL below:</li>
                      <li>
                        Enable:{" "}
                        <span className="text-foreground font-medium">
                          Block next actions until complete
                        </span>
                      </li>
                      <li>
                        Response: Tick{" "}
                        <span className="text-foreground font-medium">
                          Save HTTP response to file
                        </span>
                      </li>
                      <li>
                        Folder & filename:{" "}
                        <code className="text-foreground font-mono text-xs bg-background px-1 py-0.5 rounded">
                          /Download/nepali-cal.png
                        </code>
                      </li>
                    </ul>
                  )}
                  {(selectedDevice ||
                    (useCustom && customWidth && customHeight)) &&
                    wallpaperUrl && (
                      <div className="flex gap-2 mt-2 pr-6">
                        <code className="flex flex-1 w-full truncate font-mono rounded-md px-2 py-1 bg-background border text-xs items-center">
                          {wallpaperUrl}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCopyUrl}
                        >
                          {copied ? (
                            <CopyCheck className="size-4" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </Button>
                      </div>
                    )}
                  {!selectedDevice && !useCustom && (
                    <p className="text-xs text-muted-foreground italic">
                      Select a device above to generate the URL
                    </p>
                  )}
                  {useCustom && (!customWidth || !customHeight) && (
                    <p className="text-xs text-muted-foreground italic">
                      Enter width and height above to generate the URL
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-muted-foreground text-sm shrink-0">
                  {platform === "android" ? "4.2" : "3.2"}
                </span>
                <div className="text-sm">
                  <p className="font-medium">
                    {platform === "ios"
                      ? '"Set Wallpaper Photo"'
                      : "Set Wallpaper"}
                  </p>
                  {platform === "ios" && (
                    <ol className="text-muted-foreground space-y-1 list-decimal list-inside text-sm">
                      <li>Choose &quot;Lock Screen&quot;</li>
                    </ol>
                  )}
                  {platform === "android" && (
                    <ol className="text-muted-foreground space-y-1 list-decimal list-inside text-sm">
                      <li>
                        Go to{" "}
                        <span className="text-foreground font-medium">
                          Device Settings
                        </span>
                      </li>
                      <li>
                        Select{" "}
                        <span className="text-foreground font-medium">
                          Set Wallpaper
                        </span>
                      </li>
                      <li>
                        Choose{" "}
                        <span className="text-foreground font-medium">
                          Image and Screen
                        </span>
                      </li>
                      <li>
                        Enter folder & filename:{" "}
                        <code className="text-foreground font-mono text-xs bg-background px-1 py-0.5 rounded">
                          /Download/nepali-cal.png
                        </code>
                      </li>
                    </ol>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 -mx-4 -mb-4 rounded-b-lg overflow-x-hidden">
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                <strong>Important:</strong>{" "}
                {platform === "ios" ? (
                  <>
                    In &quot;Set Wallpaper Photo&quot;:
                    <ol className="mt-1 space-y-1 list-decimal list-inside ml-4">
                      <li>Tap the arrow (→) to show options</li>
                      <li>
                        Disable both{" "}
                        <strong>&quot;Crop to Subject&quot;</strong> and{" "}
                        <strong>&quot;Show Preview&quot;</strong>
                      </li>
                    </ol>
                  </>
                ) : (
                  <>
                    Use the <strong>exact same folder and filename</strong> in
                    both actions.
                  </>
                )}
              </p>
              {platform === "ios" && (
                <p className="text-xs text-yellow-600/80 dark:text-yellow-500/80 mt-1">
                  This prevents iOS from cropping and asking for confirmation
                  each time
                </p>
              )}
            </div>
          </div>
        </div>

        {platform === "android" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 rounded">
                5
              </div>
              <h3 className="font-semibold">Finalize</h3>
            </div>
            <div className="ml-10 bg-muted p-4 rounded-lg">
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Give the macro a name</li>
                <li>
                  Tap{" "}
                  <span className="text-foreground font-medium">
                    Create Macro
                  </span>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-6">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button variant="ghost" onClick={onClose} className="flex-1">
          Close
        </Button>
      </div>
    </>
  );
}
