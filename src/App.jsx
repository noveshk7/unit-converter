import { useState, useMemo, useEffect } from "react"
import { convert, getUnits, categories } from "./units"
import { FaArrowLeft } from "react-icons/fa"
import { IoSunnyOutline  } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";

import "./App.css"

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sourceValue, setSourceValue] = useState("")
  const [sourceUnit, setSourceUnit] = useState("")
  const [targetUnit, setTargetUnit] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [history, setHistory] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [darkMode])

  // Get the selected category name
  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory) return ""
    const category = categories.find((cat) => cat.id === selectedCategory)
    return category ? category.name : ""
  }, [selectedCategory])

  // Memoize the conversion result
  const conversionResult = useMemo(() => {
    if (!sourceValue || !sourceUnit || !targetUnit) return ""
    try {
      const result = convert(Number.parseFloat(sourceValue), sourceUnit, targetUnit, selectedCategory)
      if (result === null) return "Invalid conversion"

      const conversionRecord = {
        from: sourceValue,
        fromUnit: sourceUnit,
        to: result.toFixed(4),
        toUnit: targetUnit,
        category: selectedCategory,
        timestamp: new Date().toISOString(),
      }

      // Update history only if the result is valid
      setHistory((prev) => [conversionRecord, ...prev].slice(0, 10))
      return result.toFixed(4)
    } catch {
      return "Invalid conversion"
    }
  }, [sourceValue, sourceUnit, targetUnit, selectedCategory])

  // Filter categories based on search
  const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header>
        <h1>Unit Converter</h1>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
          {darkMode ? <IoSunnyOutline  /> : <FiMoon />}
        </button>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search categories"
        />
      </div>

      {!selectedCategory ? (
        <div className="categories-grid">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              className="category-card"
              onClick={() => setSelectedCategory(category.id)}
              aria-label={`Select ${category.name} category`}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="converter-container">
          <button className="back-button" onClick={() => setSelectedCategory(null)} aria-label="Back to categories">
            <FaArrowLeft />
          </button>

          <h2 className="category-heading">
            {categories.find((cat) => cat.id === selectedCategory)?.icon} {selectedCategoryName} Converter
          </h2>

          <div className="converter">
            <div className="input-group">
              <input
                type="number"
                value={sourceValue}
                onChange={(e) => setSourceValue(e.target.value)}
                placeholder="Enter value"
                aria-label="Source value"
              />
              <select value={sourceUnit} onChange={(e) => setSourceUnit(e.target.value)} aria-label="Source unit">
                <option value="">Select unit</option>
                {getUnits(selectedCategory).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="swap-button"
              onClick={() => {
                setSourceUnit(targetUnit)
                setTargetUnit(sourceUnit)
              }}
              aria-label="Swap units"
            >
              ⇄
            </button>

            <div className="input-group">
              <input
                type="text"
                value={conversionResult}
                readOnly
                placeholder="Result"
                aria-label="Conversion result"
              />
              <select value={targetUnit} onChange={(e) => setTargetUnit(e.target.value)} aria-label="Target unit">
                <option value="">Select unit</option>
                {getUnits(selectedCategory).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {history.length > 0 && (
            <div className="history">
              <h3>Recent Conversions</h3>
              <ul>
                {history.map((record, index) => (
                  <li key={index}>
                    {record.from} {record.fromUnit} = {record.to} {record.toUnit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App

