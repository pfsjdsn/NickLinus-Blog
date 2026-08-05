import { siteConfig } from "@/lib/config";
import { VisitorCounter } from "@/components/visitor-counter";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent border-border/40 border-t group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container min-h-(--footer-height) py-6 sm:py-8">
          {/* Main footer content */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            {/* Copyright and ICP info */}
            <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <div className="text-muted-foreground text-sm">
                © {currentYear} {siteConfig.copyright}. All rights reserved.
              </div>
              {siteConfig.icp?.number && (
                <div className="text-muted-foreground text-xs">
                  <a
                    href={siteConfig.icp.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {siteConfig.icp.number}
                  </a>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-col items-center gap-4 sm:items-end">
              <div className="flex items-center gap-4">
                {siteConfig.links.twitter && (
                  <a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="Twitter"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
              </div>
              <div className="text-muted-foreground text-xs">
                Built with{" "}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Next.js
                </a>
              </div>
            </div>
          </div>

          {/* Visitor counter */}
          <div className="mt-4 flex justify-center border-t pt-4">
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  );
}
