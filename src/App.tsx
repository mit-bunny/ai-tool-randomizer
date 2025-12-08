import React, { useState, useEffect } from 'react'
import { PlusIcon, XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

function App() {
  const [tools, setTools] = useState([
    { 
      id: 1, 
      name: 'ChatGPT', 
      description: 'Conversational AI assistant', 
      category: 'Chatbot',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg',
      details: 'OpenAI\'s powerful language model for conversations, coding help, and creative writing.',
      website: 'https://chat.openai.com',
      features: ['Text generation', 'Code assistance', 'Creative writing', 'Problem solving']
    },
    { 
      id: 2, 
      name: 'Midjourney', 
      description: 'AI image generation', 
      category: 'Image Generation',
      logo: 'https://seeklogo.com/images/M/midjourney-logo-A30AAEBC93-seeklogo.com.png',
      details: 'Create stunning artwork and images from text descriptions using advanced AI.',
      website: 'https://midjourney.com',
      features: ['Text-to-image', 'Artistic styles', 'High resolution', 'Creative prompts']
    },
    { 
      id: 3, 
      name: 'GitHub Copilot', 
      description: 'AI coding companion', 
      category: 'Developer',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      details: 'AI pair programmer that helps you write code faster with intelligent suggestions.',
      website: 'https://github.com/features/copilot',
      features: ['Code completion', 'Multiple languages', 'IDE integration', 'Context aware']
    },
    { 
      id: 4, 
      name: 'Notion AI', 
      description: 'Intelligent note-taking', 
      category: 'Productivity',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg',
      details: 'Enhanced note-taking and productivity with AI-powered writing and organization.',
      website: 'https://notion.so/ai',
      features: ['Smart writing', 'Content organization', 'Database queries', 'Task automation']
    },
    { 
      id: 5, 
      name: 'Claude', 
      description: 'Anthropic AI assistant', 
      category: 'Chatbot',
      logo: 'https://claude.ai/images/claude_app_icon.png',
      details: 'Helpful, harmless, and honest AI assistant for complex reasoning tasks.',
      website: 'https://claude.ai',
      features: ['Complex reasoning', 'Long conversations', 'Document analysis', 'Creative tasks']
    }
  ])
  
  const [selectedTool, setSelectedTool] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [flippedCards, setFlippedCards] = useState(new Set())
  const [newTool, setNewTool] = useState({ name: '', description: '', category: '', logo: '' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [uploadMode, setUploadMode] = useState('manual') // 'manual' or 'screenshot'
  const [screenshotFile, setScreenshotFile] = useState(null)
  const [isExtracting, setIsExtracting] = useState(false)
  const [stars, setStars] = useState([])
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight })
  const [lightSweep, setLightSweep] = useState({ active: false, index: -1 })
  const [selectedCardPosition, setSelectedCardPosition] = useState(null)
  const [isCardAnimating, setIsCardAnimating] = useState(false)

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 4 + 3,
          delay: Math.random() * 2
        })
      }
      setStars(newStars)
    }
    generateStars()
  }, [])

  const handleDraw = () => {
    if (tools.length === 0) return
    
    setIsDrawing(true)
    setSelectedTool(null)
    setSelectedCardPosition(null)
    setLightSweep({ active: true, index: -1 })
    
    // Light sweep animation - visit 3-4 cards
    const visits = Math.min(4, tools.length)
    const selectedIndices = []
    
    // Randomly select which cards to visit
    while (selectedIndices.length < visits) {
      const randomIndex = Math.floor(Math.random() * tools.length)
      if (!selectedIndices.includes(randomIndex)) {
        selectedIndices.push(randomIndex)
      }
    }
    
    let visitCount = 0
    const visitInterval = 600 // 600ms between visits
    
    const visitNext = () => {
      if (visitCount < visits) {
        setLightSweep({ active: true, index: selectedIndices[visitCount] })
        visitCount++
        
        setTimeout(visitNext, visitInterval)
      } else {
        // Final selection - start card movement animation
        setTimeout(() => {
          const finalIndex = selectedIndices[Math.floor(Math.random() * selectedIndices.length)]
          const finalTool = tools[finalIndex]
          
          if (finalTool) {
            setIsCardAnimating(true)
            setSelectedCardPosition({ index: finalIndex, tool: finalTool })
            setSelectedTool(finalTool)
            setIsDrawing(false)
            setLightSweep({ active: false, index: -1 })
          }
        }, 800)
      }
    }
    
    // Start after brief pause
    setTimeout(visitNext, 300)
  }

  const addTool = () => {
    if (!newTool.name.trim()) return
    const tool = {
      id: Date.now(),
      name: newTool.name.trim(),
      description: newTool.description.trim() || 'No description',
      category: newTool.category.trim() || 'Other',
      logo: newTool.logo || 'https://via.placeholder.com/64x64/6366f1/ffffff?text=AI',
      details: newTool.description.trim() || 'A useful AI tool for your collection.',
      features: [],
      website: `https://www.google.com/search?q=${encodeURIComponent(newTool.name + ' AI tool')}`
    }
    setTools([...tools, tool])
    setNewTool({ name: '', description: '', category: '', logo: '' })
    setShowAddForm(false)
    setUploadMode('manual')
    setScreenshotFile(null)
  }

  const extractFromScreenshot = async () => {
    if (!screenshotFile) return
    
    setIsExtracting(true)
    
    // Simulate AI extraction (you can replace with actual OpenAI Vision API)
    setTimeout(() => {
      // Mock AI extraction for demo
      const extractedData = {
        name: 'Detected AI Tool',
        description: 'AI-powered tool for enhanced productivity',
        category: 'Productivity',
        logo: 'https://via.placeholder.com/64x64/6366f1/ffffff?text=AI'
      }
      setNewTool(extractedData)
      setIsExtracting(false)
      setUploadMode('manual')
    }, 2000)
  }

  const handleScreenshotUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setScreenshotFile(file)
      setUploadMode('screenshot')
    }
  }

  const toggleCardFlip = (id) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Calculate center position for selected card
  const calculateCardPosition = (index) => {
    // Get card dimensions from the grid
    const cardWidth = 280
    const cardHeight = 380
    const gap = 24 // gap-6 in Tailwind
    
    // Calculate grid columns based on screen size
    const cols = Math.max(1, Math.floor(screenSize.width / (cardWidth + gap)))
    
    const row = Math.floor(index / cols)
    const col = index % cols
    
    // Calculate current position (top-left corner of card)
    const currentX = col * (cardWidth + gap)
    const currentY = row * (cardHeight + gap)
    
    // Calculate card center position
    const cardCenterX = currentX + cardWidth / 2
    const cardCenterY = currentY + cardHeight / 2
    
    // Calculate screen center
    const screenCenterX = screenSize.width / 2
    const screenCenterY = screenSize.height / 2 - 50
    
    // Calculate translation needed
    const translateX = screenCenterX - cardCenterX
    const translateY = screenCenterY - cardCenterY
    
    return { translateX, translateY }
  }

  const handleDrawAgain = () => {
    setIsCardAnimating(false)
    setSelectedTool(null)
    setSelectedCardPosition(null)
    setLightSweep({ active: false, index: -1 })
  }

  return (
    <div className="h-screen max-h-screen bg-gray-950 text-white overflow-hidden relative w-full">
      {/* Animated Night Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`
            }}
          >
            <div className="w-full h-full bg-white rounded-full opacity-60" />
          </div>
        ))}
      </div>

      {/* Add Tool Form */}
      {showAddForm && (
        <div className="fixed top-0 left-0 right-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/30">
          <div className="max-w-4xl mx-auto px-6 py-4">
            {/* Mode Toggle */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex bg-gray-800/50 rounded-lg p-1">
                <button
                  onClick={() => setUploadMode('manual')}
                  className={`px-4 py-2 rounded text-sm transition-all duration-300 ${
                    uploadMode === 'manual' 
                      ? 'bg-blue-600/30 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ✏️ Manual Entry
                </button>
                <button
                  onClick={() => setUploadMode('screenshot')}
                  className={`px-4 py-2 rounded text-sm transition-all duration-300 ${
                    uploadMode === 'screenshot' 
                      ? 'bg-blue-600/30 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  📸 Screenshot Upload
                </button>
              </div>
            </div>

            {/* Manual Entry Mode */}
            {uploadMode === 'manual' && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <input
                  type="text"
                  placeholder="Tool name"
                  value={newTool.name}
                  onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                  className="px-3 py-2 bg-gray-800/30 border border-gray-700/30 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400/50 backdrop-blur-sm"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newTool.description}
                  onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                  className="px-3 py-2 bg-gray-800/30 border border-gray-700/30 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400/50 backdrop-blur-sm"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newTool.category}
                  onChange={(e) => setNewTool({...newTool, category: e.target.value})}
                  className="px-3 py-2 bg-gray-800/30 border border-gray-700/30 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400/50 backdrop-blur-sm"
                />
                <input
                  type="text"
                  placeholder="Logo URL"
                  value={newTool.logo}
                  onChange={(e) => setNewTool({...newTool, logo: e.target.value})}
                  className="px-3 py-2 bg-gray-800/30 border border-gray-700/30 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-400/50 backdrop-blur-sm"
                />
                <button
                  onClick={addTool}
                  className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 backdrop-blur-sm rounded transition-all duration-300 border border-blue-500/30 text-sm"
                >
                  Add Tool
                </button>
              </div>
            )}

            {/* Screenshot Upload Mode */}
            {uploadMode === 'screenshot' && (
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="border-2 border-dashed border-gray-600/50 rounded-lg p-8 text-center w-full max-w-md">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label htmlFor="screenshot-upload" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">
                        {screenshotFile ? screenshotFile.name : 'Click to upload a screenshot'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload a screenshot of any AI tool interface
                      </p>
                    </label>
                  </div>

                  {screenshotFile && !isExtracting && (
                    <button
                      onClick={extractFromScreenshot}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 backdrop-blur-sm rounded-lg transition-all duration-300 border border-purple-500/30 text-white font-medium"
                    >
                      🔍 Extract Tool Info with AI
                    </button>
                  )}

                  {isExtracting && (
                    <div className="flex items-center space-x-3 text-purple-400">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
                      <span className="text-sm">AI is analyzing your screenshot...</span>
                    </div>
                  )}

                  {newTool.name && uploadMode === 'manual' && (
                    <button
                      onClick={addTool}
                      className="px-6 py-2 bg-green-600/20 hover:bg-green-600/30 backdrop-blur-sm rounded-lg transition-all duration-300 border border-green-500/30 text-white font-medium"
                    >
                      ✅ Add Tool to Collection
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setUploadMode('manual')
                  setScreenshotFile(null)
                  setNewTool({ name: '', description: '', category: '', logo: '' })
                }}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex-1 w-full h-full flex items-center justify-center p-4">
        <div className="w-full h-full max-w-full max-h-full">
          <div className="grid gap-6 justify-items-center items-center" style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
            maxWidth: '100%',
            height: '100%',
            position: 'relative'
          }}>
            {tools.map((tool, index) => {
              const isSelected = selectedCardPosition && selectedCardPosition.index === index
              const position = isSelected ? calculateCardPosition(index) : null
              
              return (
              <div
                key={tool.id}
                className="relative perspective-1000"
                style={{
                  width: '280px',
                  height: '380px',
                  ...(isSelected ? {
                    transform: `translate(${position.translateX}px, ${position.translateY}px) scale(1.3)`,
                    zIndex: 50,
                    transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  } : {}),
                  ...(selectedCardPosition && !isSelected ? {
                    opacity: 0.7,
                    transition: 'opacity 0.7s ease'
                  } : {})
                }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                    flippedCards.has(tool.id) ? 'rotate-y-180' : ''
                  }`}
                  onClick={() => toggleCardFlip(tool.id)}
                >
                  {/* Card Front */}
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <div className={`relative h-full backdrop-blur-md border rounded-3xl overflow-hidden group ${
                      isSelected 
                        ? 'bg-white border-white/40' 
                        : 'bg-gray-800/20 border-gray-600/30'
                    } ${
                      lightSweep.active && lightSweep.index === index ? 'animate-pulse' : ''
                    }`}>
                      
                      {/* Light shining from behind - fills entire card */}
                      {lightSweep.active && lightSweep.index === index && (
                        <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse" />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 rounded-3xl" />
                      
                      {/* Enhanced shadow for selected white card */}
                      {isSelected && (
                        <div className="absolute inset-0 rounded-3xl shadow-2xl shadow-white/20" />
                      )}
                      
                      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                        <div className={`mb-6 w-20 h-20 transition-all duration-300 ${
                          lightSweep.active && lightSweep.index === index 
                            ? 'scale-110 drop-shadow-lg' 
                            : isSelected
                              ? 'scale-110 drop-shadow-lg'
                              : ''
                        }`}>
                          <img 
                            src={tool.logo} 
                            alt={tool.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/80x80/6366f1/ffffff?text=AI'
                            }}
                          />
                        </div>
                        
                        <h3 className={`font-bold text-lg transition-all duration-300 ${
                          lightSweep.active && lightSweep.index === index 
                            ? 'text-white drop-shadow-lg' 
                            : isSelected
                              ? 'text-gray-900'
                              : 'text-white'
                        }`}>
                          {tool.name}
                        </h3>
                        
                        {/* Action Buttons for Selected Card */}
                        {isSelected && isCardAnimating && (
                          <div className="absolute bottom-4 left-4 right-4 space-y-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(tool.website, '_blank')
                              }}
                              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-all duration-300"
                            >
                              🚀 Check it out
                            </button>
                            
                            <div className="flex space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDrawAgain()
                                }}
                                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg text-sm transition-all duration-300"
                              >
                                🎲 Again
                              </button>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setTools(tools.filter(t => t.id !== tool.id))
                                  setLightSweep({ active: false, index: -1 })
                                }}
                                className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg text-sm transition-all duration-300"
                              >
                                🗑️ Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Selection glow effect */}
                  {lightSweep.active && lightSweep.index === index && (
                    <div className="absolute inset-0 rounded-3xl bg-white/30 animate-pulse" />
                  )}
                  
                  {/* Card Back */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                    <div className={`relative h-full backdrop-blur-md rounded-3xl p-6 text-gray-900 shadow-2xl overflow-hidden border ${
                      isSelected 
                        ? 'bg-white border-white/40' 
                        : 'bg-white/95 border-white/20'
                    } ${lightSweep.active && lightSweep.index === index ? 'animate-pulse' : ''}`}>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(tool.website, '_blank')
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Visit"
                        >
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setTools(tools.filter(t => t.id !== tool.id))
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Remove"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="h-full flex flex-col justify-center text-center">
                        <div className="w-16 h-16 mx-auto mb-4">
                          <img 
                            src={tool.logo} 
                            alt={tool.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/64x64/6366f1/ffffff?text=AI'
                            }}
                          />
                        </div>
                        
                        <h3 className="font-bold mb-4 text-lg">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {tool.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex items-center space-x-4 bg-gray-900/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl px-6 py-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
            title="Add Tool"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleDraw}
            disabled={isDrawing || tools.length === 0}
            className={`px-6 py-2 rounded-xl transition-all duration-300 border text-sm ${
              isDrawing || tools.length === 0 
                ? 'bg-gray-600/20 border-gray-500/30 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/30 text-white'
            } backdrop-blur-sm`}
          >
            {isDrawing ? 'Selecting...' : '✨ Draw Tool'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
