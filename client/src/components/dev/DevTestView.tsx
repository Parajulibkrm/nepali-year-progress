import { devices } from "../../devices";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const SERVER_URL = "http://localhost:8787";

export function DevTestView() {
  const iosDevices = devices.filter((d) => d.platform === "ios");

  return (
    <div className="w-full max-w-7xl mx-auto p-8 mt-12 border-t border-dashed">
      <div className="flex flex-col gap-4 mb-8">
        <h2 className="text-2xl font-bold text-primary">Dev Test Section</h2>
        <p className="text-muted-foreground text-sm">
          Rendering all iOS device wallpapers lazily for verification. Available
          only in dev mode.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {iosDevices.map((device) => (
          <div key={device.value} className="space-y-4">
            <div className="flex items-baseline gap-3">
              <h3 className="text-lg font-semibold">{device.label}</h3>
              <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
                {device.width}x{device.height}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Days Grid */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">
                    Days Grid
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-muted/20">
                  <img
                    src={`${SERVER_URL}/api/year-progress/days?width=${device.width}&height=${device.height}`}
                    alt={`${device.label} Days`}
                    className="w-full h-auto aspect-[9/19.5] object-contain bg-black rounded shadow-lg border"
                    loading="lazy"
                  />
                  <div className="mt-2 text-[10px] text-muted-foreground break-all font-mono">
                    {`${SERVER_URL}/api/year-progress/days?width=${device.width}&height=${device.height}`}
                  </div>
                </CardContent>
              </Card>

              {/* Months Grid */}
              <Card>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-medium">
                    Months Grid
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-muted/20">
                  <img
                    src={`${SERVER_URL}/api/year-progress/months?width=${device.width}&height=${device.height}`}
                    alt={`${device.label} Months`}
                    className="w-full h-auto aspect-[9/19.5] object-contain bg-black rounded shadow-lg border"
                    loading="lazy"
                  />
                  <div className="mt-2 text-[10px] text-muted-foreground break-all font-mono">
                    {`${SERVER_URL}/api/year-progress/months?width=${device.width}&height=${device.height}`}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
