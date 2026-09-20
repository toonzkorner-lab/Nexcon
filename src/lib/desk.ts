export type DeskState = {
  open: boolean;
  label: string;
  local: string;
};

export function deskState(now = new Date(), zone = "America/Chicago"): DeskState {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map((p) => [p.type, p.value]));
  const hour = Number(parts.hour);
  const weekday = parts.weekday;
  const weekend = weekday === "Sat" || weekday === "Sun";
  const open = !weekend && hour >= 9 && hour < 18;
  const tz = zone.includes("Chicago") ? "CST" : zone.split("/").pop() ?? "";
  return {
    open,
    label: open ? "Desk open" : weekend ? "Weekend queue" : "After hours",
    local: `${parts.hour}:${parts.minute} ${tz}`,
  };
}
