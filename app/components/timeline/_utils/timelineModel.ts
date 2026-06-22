import type { TimelineState } from "../types";

export type TimelineStatus = "complete" | "current" | "upcoming";

export type TimelineEvent = {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  description: string;
  status: TimelineStatus;
};

const EVENT_BLUEPRINTS = [
  ["Discovery", "Stakeholders align on scope, risks, and success signals."],
  ["Design", "Core interaction, hierarchy, and accessibility details are drafted."],
  ["Build", "The timeline moves from plan to working product surface."],
  ["Review", "Open issues, dependencies, and acceptance criteria are checked."],
  ["Launch", "Release readiness and rollout ownership are confirmed."],
  ["Measure", "Signals from adoption, support, and delivery health are reviewed."],
  ["Iterate", "Follow-up improvements are prioritized from real usage."],
];

const EVENT_DATES = [
  ["2026-01-08", "Jan 8"],
  ["2026-02-14", "Feb 14"],
  ["2026-03-21", "Mar 21"],
  ["2026-04-18", "Apr 18"],
  ["2026-05-27", "May 27"],
  ["2026-06-30", "Jun 30"],
  ["2026-07-24", "Jul 24"],
  ["2026-08-19", "Aug 19"],
  ["2026-09-11", "Sep 11"],
  ["2026-10-06", "Oct 6"],
  ["2026-11-15", "Nov 15"],
  ["2026-12-09", "Dec 9"],
  ["2027-01-13", "Jan 13"],
  ["2027-02-17", "Feb 17"],
];

export function getEventCount(state: TimelineState) {
  return Math.max(1, Math.min(14, Math.round(state.itemCount || 1)));
}

export function getCurrentIndex(state: TimelineState) {
  const count = getEventCount(state);
  const configured = typeof state.currentItem === "number" ? state.currentItem : Math.min(3, count);
  return Math.max(1, Math.min(count, Math.round(configured))) - 1;
}

export function isCollapsed(state: TimelineState) {
  return Boolean(state.collapsed || state.previewState === "closed");
}

export function getVisibleEventCount(state: TimelineState) {
  return isCollapsed(state) ? Math.min(3, getEventCount(state)) : getEventCount(state);
}

export function getTimelineEvents(state: TimelineState): TimelineEvent[] {
  const currentIndex = getCurrentIndex(state);

  return Array.from({ length: getEventCount(state) }, (_, index) => {
    const [label, description] = EVENT_BLUEPRINTS[index % EVENT_BLUEPRINTS.length];
    const [date, displayDate] = EVENT_DATES[index % EVENT_DATES.length];
    const status: TimelineStatus = index < currentIndex ? "complete" : index === currentIndex ? "current" : "upcoming";

    return {
      id: `event-${index + 1}`,
      title: `${state.label} ${index + 1}: ${label}`,
      date,
      displayDate,
      description,
      status,
    };
  });
}

export function getStateSummary(state: TimelineState) {
  const count = getEventCount(state);
  const visibleCount = getVisibleEventCount(state);
  const collapsed = isCollapsed(state);
  const hiddenCount = count - visibleCount;

  return {
    collapsed,
    count,
    hiddenCount,
    statusText: collapsed
      ? `${visibleCount} of ${count} events shown`
      : `${count} ${count === 1 ? "event" : "events"} shown`,
  };
}
