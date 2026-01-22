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
import copy from "copy-to-clipboard";

type Platform = "ios" | "android";
type WallpaperType = "days" | "months";

interface Device {
  value: string;
  label: string;
  platform: Platform;
  width: number;
  height: number;
}

interface DeviceSetupProps {
  platform: Platform;
  devices: Device[];
  wallpaperType: WallpaperType;
  onBack: () => void;
  onClose: () => void;
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
  const [selectedDevice, setSelectedDevice] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredDevices = useMemo(() => {
    let filtered = devices.filter((d) => d.platform === platform);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((d) => d.label.toLowerCase().includes(query));
    }
    return filtered;
  }, [platform, searchQuery, devices]);

  const selectedDeviceDetails = useMemo(() => {
    return devices.find((d) => d.value === selectedDevice);
  }, [selectedDevice, devices]);

  const wallpaperUrl = useMemo(() => {
    if (!selectedDeviceDetails) return "";
    const endpoint = wallpaperType === "days" ? "days" : "months";
    return `${window.location.origin}/api/year-progress/${endpoint}?width=${selectedDeviceDetails.width}&height=${selectedDeviceDetails.height}`;
  }, [selectedDeviceDetails, wallpaperType]);

  const handleCopyUrl = async () => {
    try {
      copy("Text");
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
              onOpenChange={setComboboxOpen}
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
                    {selectedDevice
                      ? filteredDevices.find((d) => d.value === selectedDevice)
                          ?.label
                      : "Select your device"}
                  </span>
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder="Search for your phone model..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No device found.</CommandEmpty>
                    <CommandGroup>
                      {filteredDevices.map((device) => (
                        <CommandItem
                          key={device.value}
                          value={device.value}
                          onSelect={(currentValue) => {
                            setSelectedDevice(
                              currentValue === selectedDevice
                                ? ""
                                : currentValue,
                            );
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
              <p className="text-sm text-muted-foreground">
                Open{" "}
                <a
                  href="shortcuts://"
                  className="text-foreground font-medium underline underline-offset-2"
                >
                  Shortcuts
                </a>{" "}
                app → Go to{" "}
                <span className="text-foreground font-medium">Automation</span>{" "}
                tab → New Automation →{" "}
                <span className="text-foreground font-medium">Time of Day</span>{" "}
                → <span className="text-foreground font-medium">6:00 AM</span> →
                Repeat{" "}
                <span className="text-foreground font-medium">"Daily"</span> →
                Select{" "}
                <span className="text-foreground font-medium">
                  "Run Immediately"
                </span>{" "}
                →{" "}
                <span className="text-foreground font-medium">
                  "Create New Shortcut"
                </span>
              </p>
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
              <p className="text-sm text-muted-foreground">
                Open{" "}
                <span className="text-foreground font-medium">MacroDroid</span>{" "}
                → <span className="text-foreground font-medium">Add Macro</span>
                <br />
                <br />
                <span className="text-foreground font-medium">
                  Trigger:
                </span>{" "}
                Date/Time → Day/Time → Set time to{" "}
                <span className="text-foreground font-medium">00:01:00</span> →
                Activate{" "}
                <span className="text-foreground font-medium">
                  all weekdays
                </span>
              </p>
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
                  <p>
                    <span className="font-medium">
                      {platform === "ios"
                        ? '"Get Contents of URL"'
                        : "Download Image"}
                    </span>
                    <span className="text-muted-foreground">
                      {platform === "ios" ? " → paste the following URL:" : ""}
                    </span>
                  </p>
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
                    </ul>
                  )}
                  {selectedDevice && (
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
                  {!selectedDevice && (
                    <p className="text-xs text-muted-foreground italic">
                      Select a device above to generate the URL
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
                  {platform === "ios" ? (
                    <p className="text-muted-foreground">
                      → choose "Lock Screen"
                    </p>
                  ) : (
                    <ul className="text-muted-foreground space-y-1 list-disc list-inside text-sm">
                      <li>
                        Go to{" "}
                        <span className="text-foreground font-medium">
                          Device Settings
                        </span>{" "}
                        →{" "}
                        <span className="text-foreground font-medium">
                          Set Wallpaper
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 -mx-4 -mb-4 rounded-b-lg overflow-x-hidden">
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                <strong>Important:</strong>{" "}
                {platform === "ios" ? (
                  <>
                    In "Set Wallpaper Photo", tap the arrow (→) to show options
                    → disable both <strong>"Crop to Subject"</strong> and{" "}
                    <strong>"Show Preview"</strong>
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
              <p className="text-sm text-muted-foreground">
                Give the macro a name → Tap{" "}
                <span className="text-foreground font-medium">
                  Create Macro
                </span>
              </p>
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
