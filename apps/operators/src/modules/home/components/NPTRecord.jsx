import { PieChart, Pie, Cell } from "recharts";

export const NPTRecord = () => {
  const rings = [
    { value: 80, color: "#FF708B", label: "Well Control", percentage: 80 },
    {
      value: 60,
      color: "#FFBA69",
      label: "Well Bore Instability",
      percentage: 60,
    },
    {
      value: 40,
      color: "#01F1E3",
      label: "Well Equipment Failure",
      percentage: 40,
    },
    { value: 40, color: "#8676FF", label: "Human Errors", percentage: 40 },
  ];

  return (
    <div className='flex justify-center items-center'>
      <MultiRingDoughnut rings={rings} />
    </div>
  );
};

const MultiRingDoughnut = ({ rings }) => {
  const size = 300; // chart width & height
  const ringThickness = 18; // thickness of each ring

  return (
    <div className='flex flex-col items-center gap-3 p-5 rounded-3xl bg-white w-full'>
      <h2 className='text-lg font-bold'>NPT Record</h2>
      <PieChart width={size} height={size}>
        {rings.map((ring, index) => {
          const innerRadius = 70 + index * ringThickness; // space rings apart
          const outerRadius = innerRadius + ringThickness;

          const data = [
            { name: ring.label, value: ring.value },
            { name: "Remaining", value: 100 - ring.value },
          ];

          return (
            <Pie
              key={index}
              data={data}
              dataKey='value'
              cx='50%'
              cy='50%'
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={270}
              endAngle={-90}
              stroke='#F0F3FF'
              cornerRadius={ringThickness / 2} // rounded ends
            >
              {data.map((entry, i) => (
                <Cell
                  key={`cell-${i}`}
                  fill={i === 0 ? ring.color : "#F0F3FF"}
                />
              ))}
            </Pie>
          );
        })}
      </PieChart>
      <div className='w-fit '>
        {rings.map((ring) => (
          <div key={ring.label} className='flex items-center mb-2 space-x-1'>
            <div
              className='h-2 w-2 rounded-full'
              style={{ backgroundColor: ring.color }}
            />
            <div className='flex gap-28 justify-between w-full'>
              <div sx={{ fontSize: "12px", fontWeight: 400 }}>{ring.label}</div>
              <div sx={{ fontSize: "12px", fontWeight: 400 }}>
                {ring?.percentage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
