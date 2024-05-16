export default function Spinner() {
	return (
		<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-4 border-sky-800">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
	);
}
