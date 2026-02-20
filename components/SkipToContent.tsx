export default function SkipToContent() {
  return (
    <a className="absolute -top-8 left-2 z-50 rounded-xl bg-indigo-900 px-2 py-1 focus:top-2" href="#content" tabIndex={0}>
      Skip to content
    </a>
  );
}