import { useState } from 'react'

function App() {
  const [tools] = useState([
    { id: 1, name: 'NotebookLM' },
    { id: 2, name: 'Notion AI' },
    { id: 3, name: 'GitHub Copilot' },
    { id: 4, name: 'Figma Make' },
    { id: 5, name: 'Alpha Arena' },
    { id: 6, name: 'Granola' },
    { id: 7, name: 'Origin' },
    { id: 8, name: 'Bro' },
    { id: 9, name: 'Perplexity' },
    { id: 10, name: 'Tyce' }
  ])

  const [selectedTool, setSelectedTool] = useState(null)

  const handleDraw = () => {
    const randomTool = tools[Math.floor(Math.random() * tools.length)]
    setSelectedTool(randomTool)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        AI Tool Randomizer
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {tools.map(tool => (
          <div 
            key={tool.id} 
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:bg-gray-700/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl"
            onClick={() => setSelectedTool(tool)}
          >
            <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button 
          onClick={handleDraw}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          🎯 Draw Random Tool
        </button>
      </div>
      
      {selectedTool && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Tool:</h2>
            <h3 className="text-3xl font-bold text-blue-600 mb-6">{selectedTool.name}</h3>
            <button 
              onClick={() => setSelectedTool(null)}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
