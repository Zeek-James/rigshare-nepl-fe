import React from 'react';

const GanttChart = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  
  const equipmentData = [
    {
      id: 1,
      name: 'Excavator A',
      tasks: [
        { start: 0, duration: 3, company: 'Shell', color: 'bg-purple-300', logo: '🐚' }
      ]
    },
    {
      id: 2, 
      name: 'Bulldozer B',
      tasks: [
        { start: 2, duration: 1, company: 'Sahara', color: 'bg-sky-400', logo: '🏜️' },
        { start: 3, duration: 0.5, company: 'Total', color: 'bg-red-400', logo: '⭕' },
        { start: 4, duration: 6, company: 'Shell', color: 'bg-sky-500', logo: '🐚' }
      ]
    },
    {
      id: 3,
      name: 'Cranes C', 
      tasks: [
        { start: 0, duration: 10, company: 'Shell', color: 'bg-yellow-300', logo: '🐚' }
      ]
    },
    {
      id: 4,
      name: 'Forklift D',
      tasks: [
        { start: 3, duration: 3.5, company: 'Sahara', color: 'bg-purple-400', logo: '🏜️' },
        { start: 6.5, duration: 1.5, company: '', color: 'bg-purple-400', logo: '' },
        { start: 8, duration: 2, company: '', color: 'bg-purple-400', logo: '' }
      ]
    },
    {
      id: 5,
      name: 'Dump Truck E',
      tasks: [
        { start: 0, duration: 6, company: 'Total', color: 'bg-red-400', logo: '⭕' },
        { start: 6.5, duration: 3.5, company: '', color: 'bg-red-400', logo: '' }
      ]
    }
  ];

  const getBarStyle = (start, duration) => ({
    left: `${(start / 10) * 100}%`,
    width: `${(duration / 10) * 100}%`
  });

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Equipment Usage Timeline</h2>
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
          <option>📅 Monthly</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Timeline Header */}
      <div className="mb-4">
        <div className="grid grid-cols-11 gap-2 text-sm text-gray-600 font-medium">
          <div></div>
          {months.map((month, index) => (
            <div key={index} className="text-center py-2">
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Gantt Rows */}
      <div className="space-y-3">
        {equipmentData.map((equipment) => (
          <div key={equipment.id} className="grid grid-cols-11 gap-2 items-center min-h-[50px]">
            {/* Equipment Name */}
            <div className="text-sm font-medium text-gray-700 text-right pr-4">
              {equipment.name}
            </div>

            {/* Timeline Grid */}
            <div className="col-span-10 relative h-8 bg-gray-50 rounded-lg">
              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-10">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border-r border-gray-200 h-full"></div>
                ))}
              </div>

              {/* Task Bars */}
              {equipment.tasks.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className={`absolute h-6 top-1 ${task.color} rounded-lg flex items-center px-2 text-white text-xs font-medium shadow-sm`}
                  style={getBarStyle(task.start, task.duration)}
                >
                  {task.company && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{task.logo}</span>
                      <span className="text-xs font-medium">{task.company}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-300 rounded"></div>
            <span className="text-gray-600">🐚 Shell</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-sky-400 rounded"></div>
            <span className="text-gray-600">🏜️ Sahara</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span className="text-gray-600">⭕ Total</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;