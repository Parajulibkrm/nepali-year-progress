import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full max-w-4xl px-4 py-8 mt-4 flex flex-col items-center gap-4 text-sm text-muted-foreground border-t border-muted/50">
      <div className="flex flex-col items-center gap-2 text-center">
        <p>
          Inspired by{" "}
          <a
            href="https://www.thelifecalendar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline underline-offset-4 font-medium transition-colors"
          >
            thelifecalendar.com
          </a>
        </p>
        <p className="flex items-center gap-1.5">
          Made in Nepal 🇳🇵 by{" "}
          <a
            href="https://bibek-timsina.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-semibold hover:underline underline-offset-4 transition-colors"
          >
            bimsina
          </a>
        </p>
      </div>

      <a
        href="https://github.com/bimsina/nepali-year-progress"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-foreground"
      >
        <Github className="size-4" />
        <span>View on GitHub</span>
      </a>
    </footer>
  );
}
