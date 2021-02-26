import Fuse from "fuse.js";

export default function fuzzySearch(options) {
  const fuse = new Fuse(options, {
    keys: ["name", "groupName"], // Check if this is needed
    threshold: 0.0, // Exact matches only
  });

  return (value) => {
    if (!value.length) {
      return options;
    }

    return fuse.search(value);
  };
}
