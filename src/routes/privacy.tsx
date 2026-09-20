import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Crumbs } from "@/components/site/crumbs";
import { useSite } from "@/lib/cms/use-site";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";

/**
 * Placeholder privacy policy — honest about what the site collects.
 * OWNER: replace this with your real policy text before launch.
 */
export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.privacy.title,
      description: PAGE_COPY.privacy.description,
      path: "/privacy",
      site,
    });
  },
});

function PrivacyPage() {
  const { settings } = useSite();
  return (
    <div>
      <PageHeader
        kicker="Privacy"
        title="What we collect, and why."
        lede="Short version: only what you send us, and only to do the work."
      />
      <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Privacy" }]} />
        <div className="mt-10 space-y-6 text-base leading-relaxed text-fg-muted">
          <section>
            <h2 className="text-xl font-medium text-fg">Information you send us</h2>
            <p className="mt-2">
              Briefs, contact messages, orders, and reviews you submit through this site are stored so the studio
              can respond and fulfill. That means your name, email, and whatever you write in the form — nothing
              else.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-fg">What we do not do</h2>
            <p className="mt-2">
              We do not sell personal information, run third-party ad trackers, or share your details with anyone
              except the services required to operate the site (hosting, email delivery).
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-fg">Accounts</h2>
            <p className="mt-2">
              If you create an account, we store your email and a securely hashed credential. Session cookies keep
              you signed in; they are not used for advertising.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-fg">Your rights</h2>
            <p className="mt-2">
              Write to <a href={`mailto:${settings.email}`} className="text-fg hover:underline">{settings.email}</a>{" "}
              to see, correct, or delete the information we hold about you.
            </p>
          </section>
          <p className="text-sm text-fg-subtle">Last updated: September 2026.</p>
        </div>
      </div>
    </div>
  );
}
