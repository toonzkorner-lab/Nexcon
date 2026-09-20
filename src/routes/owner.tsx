import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { DeskShell, type DeskContext } from "@/components/owner/desk-shell";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { ownerBootstrap } from "@/lib/cms/owner";
import { pageHead, siteFromMatches } from "@/lib/seo";

export const Route = createFileRoute("/owner")({
  loader: async () => {
    try {
      const res = await ownerBootstrap();
      if (!res.ok) {
        if (res.error.includes("already has an owner")) {
          return { denied: true as const, error: res.error };
        }
        throw redirect({ to: "/login" });
      }
      return { denied: false as const, desk: res.data };
    } catch {
      throw redirect({ to: "/login" });
    }
  },
  component: OwnerLayout,
  head: ({ matches }) =>
    pageHead({
      title: "Owner desk",
      description: "Edit the studio site, inbox, and catalog.",
      path: "/owner",
      site: siteFromMatches(matches),
      index: false,
    }),
});

function OwnerLayout() {
  const data = Route.useLoaderData();
  const { user, isPending } = useCurrentUserState();

  if (data.denied) {
    return (
      <div className="mx-auto max-w-md px-6 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Desk</p>
        <h1 className="mt-3 text-3xl font-light">This desk already has an owner.</h1>
        <p className="mt-3 text-sm text-fg-muted">{data.error} Sign in with an owner account, or ask them to add you.</p>
      </div>
    );
  }

  if (!isPending && !user) return <RedirectToSignIn to="/login" />;

  return (
    <DeskShell>
      <Outlet />
    </DeskShell>
  );
}

export function useDesk(): DeskContext {
  const data = Route.useLoaderData();
  if (data.denied) {
    throw new Error("Not an owner");
  }
  return data.desk;
}
