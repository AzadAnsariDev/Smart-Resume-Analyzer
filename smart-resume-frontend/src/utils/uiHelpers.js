export const getTipUI = (type) => {
  switch (type) {
    case "good":
      return {
        bg: "bg-green-900/20",
        border: "border-green-500",
        text: "text-green-300",
        badge: "bg-green-900/40 text-green-400",
        glow: "rgba(34,197,94,0.5)",
        label: "Good",
      };

    case "improve":
      return {
        bg: "bg-yellow-900/20",
        border: "border-yellow-500",
        text: "text-yellow-300",
        badge: "bg-yellow-900/40 text-yellow-400",
        glow: "rgba(245,158,11,0.5)",
        label: "Needs Improvement",
      };

    case "critical":
      return {
        bg: "bg-red-900/20",
        border: "border-red-500",
        text: "text-red-300",
        badge: "bg-red-900/40 text-red-400",
        glow: "rgba(239,68,68,0.5)",
        label: "Critical",
      };

    default:
      return {};
  }
};
