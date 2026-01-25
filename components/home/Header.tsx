export function Header() {
  return (
    <header className="w-full max-w-4xl px-4 pt-4 flex flex-col items-center text-center gap-6">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-black text-foreground">
          <span className="text-[#DC143C]">Nepali</span> Year Progress
        </h1>
        <div className="space-y-2">
          <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Visualize your year at a glance. Beautiful, automatically updated
            progress grids for your lock screen.
          </p>
        </div>
      </div>
    </header>
  );
}
