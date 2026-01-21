import { useState, useMemo } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
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

type Platform = "ios" | "android";

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
  onBack: () => void;
  onClose: () => void;
}

export function DeviceSetup({
  platform,
  devices,
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
    return `${window.location.origin}/api/year-progress?width=${selectedDeviceDetails.width}&height=${selectedDeviceDetails.height}`;
  }, [selectedDeviceDetails]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(wallpaperUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
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
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
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

        {platform === "android" && (
          <div className="space-y-3 overflow-x-hidden">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 rounded">
                2
              </div>
              <h3 className="font-semibold">Install MacroDroid</h3>
            </div>
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
          </div>
        )}

        <div className="space-y-3 overflow-x-hidden">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 rounded">
              {platform === "ios" ? "2" : "3"}
            </div>
            <h3 className="font-semibold">
              {platform === "ios" ? "Create Automation" : "Setup Macro"}
            </h3>
          </div>
          <div className="ml-10 bg-muted p-4 rounded-lg">
            {platform === "ios" ? (
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
            ) : (
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
            )}
          </div>
        </div>

        <div className="space-y-3 overflow-x-hidden">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 rounded">
              {platform === "ios" ? "3" : "4"}
            </div>
            <h3 className="font-semibold">
              {platform === "ios" ? "Create Shortcut" : "Configure Actions"}
            </h3>
          </div>
          <div className="ml-10 bg-muted p-4 rounded-lg space-y-4 overflow-x-hidden">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Add these actions:
            </p>

            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-muted-foreground text-sm shrink-0">
                  {platform === "ios" ? "3.1" : "4.1"}
                </span>
                <div className="text-sm space-y-2 wrap-break-word">
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
                    <div className="flex gap-2 mt-2">
                      <code className="flex-1 min-w-0 bg-background border px-3 py-2 text-xs font-mono truncate rounded">
                        {wallpaperUrl}
                      </code>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopyUrl}
                        className="shrink-0"
                      >
                        {copied ? (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect width="14" height="14" x="8" y="8" rx="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        )}
                      </Button>
                    </div>
                  )}
                  {!selectedDevice && (
                    <p className="text-xs text-muted-foreground italic">
                      Select a device above to generate the URL
                    </p>
                  )}
                  {platform === "android" && (
                    <ul className="text-muted-foreground space-y-1 list-disc list-inside text-sm mt-2">
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
                        <code className="inline-block bg-background px-1 py-0.5 text-foreground text-xs rounded break-all">
                          /Download/nepali-year.png
                        </code>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-muted-foreground text-sm shrink-0">
                  {platform === "ios" ? "3.2" : "4.2"}
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
                      <li>
                        Choose{" "}
                        <span className="text-foreground font-medium">
                          Image and Screen
                        </span>
                      </li>
                      <li>
                        Enter folder & filename:{" "}
                        <code className="inline-block bg-background px-1 py-0.5 text-foreground text-xs rounded break-all">
                          /Download/nepali-year.png
                        </code>
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
