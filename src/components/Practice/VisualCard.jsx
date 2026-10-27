export default function VisualCard() {
  const randomArray = [
    {
      name: "Mahesh",
      detail: "Berojgar",
    },
    {
      name: "Ramesh",
      detail: "Who is this",
    },
    {
      name: "Sameer",
      detail: "Ko ho yo",
    },
    {
      name: "Tilak",
      detail: "Ye kon hein",
    },
    {
      name: "Wance",
      detail: "Yo ho ko",
    },
  ];
  return (
    <>
      <div className="border border-red-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {randomArray.map((eachEle) => (
            <div className="border border-emerald-500 bg-white p-5 rounded-xl hover:border-orange-300 transition-colors"
            key={eachEle.name}
            >
                <h3>{eachEle.name}</h3>
                <p>{eachEle.detail}</p>
            </div>
            ))}

      </div>
    </>
  );
}
