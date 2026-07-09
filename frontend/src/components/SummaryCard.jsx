function SummaryCard({ summary }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        Threat Summary
      </h2>

      {Array.isArray(summary) ? (
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {summary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">
          {summary || "No summary available."}
        </p>
      )}
    </div>
  );
}

export default SummaryCard;