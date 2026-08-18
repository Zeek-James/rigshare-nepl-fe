import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const data = [
  { label: "Available days", value: 99, color: "#007BFF", outer: 130 },
  { label: "Planned lease days", value: 133, color: "#A259FF", outer: 110 },
  { label: "Completed Lease", value: 170, color: "#FF8A34", outer: 150 },
];

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 10;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      {/* Bubble */}
      <rect
        x={x - 16}
        y={y - 12}
        width={32}
        height={20}
        rx={4}
        fill='#fff'
        stroke='rgba(0,0,0,0.1)'
      />
      {/* Text */}
      <text
        x={x}
        y={y - 2}
        fill='#000'
        textAnchor='middle'
        dominantBaseline='middle'
        fontSize={12}
        fontWeight='bold'
      >
        {value}
      </text>
    </g>
  );
};

export const EquipmentShareProgress = () => {
  return (
    <div className='flex flex-col items-center gap-3 p-5 rounded-3xl bg-white w-full h-full'>
      <h2 className='text-lg font-bold'>Equipment Share Progress</h2>
      <ResponsiveContainer>
        <PieChart>
          {data.map((d, i) => (
            <Pie
              key={i}
              data={[d]}
              dataKey='value'
              cx='50%'
              cy='45%'
              outerRadius={d.outer}
              startAngle={
                i === 0
                  ? 0
                  : data
                      .slice(0, i)
                      .reduce(
                        (acc, cur) =>
                          acc +
                          (cur.value / data.reduce((a, b) => a + b.value, 0)) *
                            360,
                        0
                      )
              }
              endAngle={data
                .slice(0, i + 1)
                .reduce(
                  (acc, cur) =>
                    acc +
                    (cur.value / data.reduce((a, b) => a + b.value, 0)) * 360,
                  0
                )}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              <Cell fill={d.color} />
            </Pie>
          ))}
          {/* <Legend
            verticalAlign='bottom'
            align='center'
            iconType='circle'
            formatter={(value, entry) => (
              <span style={{ color: "#555", fontSize: 14 }}>
                {value}{" "}
                <span style={{ marginLeft: 5 }}>{entry.payload.value}</span>
              </span>
            )}
          /> */}
        </PieChart>
      </ResponsiveContainer>
      <div className='w-fit '>
        {data.map((data) => (
          <div key={data.label} className='flex items-center mb-2 space-x-1'>
            <div
              className='h-2 w-2 rounded-full'
              style={{ backgroundColor: data.color }}
            />
            <div className='flex gap-28 justify-between w-full'>
              <div sx={{ fontSize: "12px", fontWeight: 400 }}>{data.label}</div>
              <div sx={{ fontSize: "12px", fontWeight: 400 }}>
                {data?.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
