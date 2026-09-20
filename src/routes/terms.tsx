import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/page-header";
import { Crumbs } from "@/components/site/crumbs";
import { useSite } from "@/lib/cms/use-site";
import { PAGE_COPY, pageHead, siteFromMatches } from "@/lib/seo";

/**
 * Placeholder terms of service — plain-language working terms.
 * OWNER: replace this with your real terms before launch.
 */
export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: ({ matches }) => {
    const site = siteFromMatches(matches);
    return pageHead({
      title: PAGE_COPY.terms.title,
      description: PAGE_COPY.terms.description,
      path: "/terms",
      site,
    });
  },
});

function TermsPage() {
  const { settings } = useSite();
  return (
    <div>
      <PageHeader
        kicker="Terms"
        title="The working agreement."
        lede="Plain language. The full contract for a project is always the written brief."
      />
      <div className="mx-auto max-w-2xl px-4 pb-20 sm:px-6">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Terms" }]} />
        <div className="mt-10 space-y-6 text-base leading-relaxed text-fg-muted">
          <section>
            <h2 className="text-xl font-medium text-fg">Services</h2>
            <p className="mt-2">
              Project scope, price, and timeline are agreed in writing before work starts — the brief you open on
              this site becomes the statement of work. Estimates are not invoices; changes outside the brief are
              scoped and priced separately.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-fg">Digital goods</h2>
            <p className="mt-2">
              Store purchases grant one production license unless noted otherwise. Templates and themes are
              delivered as-is; support covers installation questions for 30 days.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-fg">Payment</h2>
            <p className="mt-2">
              Project work is billed per the agreed brief — typically a deposit to start and the balance on
              delivery. Subscriptions (hosting, care plans) renew monthly and can be cancelled any time; service
              continues to the end of the paid period.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-fg">Ownership</h2>
            <p className="mt-2">
              You own the finished work product on final payment, including source files we wrote for you. The
              studio retains the right to describe the engagement in its portfolio unless you ask otherwise in
              writing.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-fg">Contact</h2>
            <p className="mt-2">
              Questions about these terms:{" "}
              <a href={`mailto:${settings.email}`} className="text-fg hover:underline">{settings.email}</a>.
            </p>
          </section>
          <p className="text-sm text-fg-subtle">Last updated: September 2026.</p>
        </div>
      </div>
    </div>
  );
}
