import { useState } from 'react'
import { useLang } from './i18n'

export default function Calculator({ onApplyToQuote }){
  const { t } = useLang()
  const [vehicles, setVehicles] = useState(25)
  const [tyresPerVehicle, setTyresPerVehicle] = useState(10)
  const [newTyreCost, setNewTyreCost] = useState(22000)
  const [retreadCycles, setRetreadCycles] = useState(2)

  // Calculations
  const totalFleetTyres = vehicles * tyresPerVehicle
  const retreadUnitCost = 2400

  // Total investment if buying 100% new tyres vs City Sphere closed-loop retread programme
  const totalAllNewCost = totalFleetTyres * newTyreCost
  // In a 2-cycle retread programme, 1 casing gives 3 service lives (1 new + 2 retreads)
  const effectiveCycles = retreadCycles + 1
  const casingsNeeded = Math.ceil(totalFleetTyres / effectiveCycles)
  const retreadsPerformed = totalFleetTyres - casingsNeeded

  const retreadProgrammeCost = (casingsNeeded * newTyreCost) + (retreadsPerformed * retreadUnitCost)
  const netSavings = Math.max(0, totalAllNewCost - retreadProgrammeCost)
  const savingsPercent = Math.round((netSavings / totalAllNewCost) * 100)

  // Sustainability Metrics (Industry standards: Retreading saves ~15 gallons of oil & ~35 kg rubber per truck tyre)
  const oilSavedGallons = Math.round(retreadsPerformed * 15)
  const rubberSavedKg = Math.round(retreadsPerformed * 36)
  const co2SavedTonnes = ((oilSavedGallons * 3.785 * 2.3) / 1000).toFixed(1)

  const handleApply = () => {
    const summary = `Fleet Savings Plan: ${vehicles} vehicles (${tyresPerVehicle} wheels each, total ${totalFleetTyres} tyres). Estimated Annual Savings: ₹${netSavings.toLocaleString('en-IN')}. Please provide official fleet retread proposal.`
    if (onApplyToQuote) onApplyToQuote(summary)
  }

  return (
    <div className="calc-card">
      <div className="calc-sliders">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>
            <span className="dash"/> INTERACTIVE FLEET ROI ESTIMATOR
          </div>
          <h3 style={{ fontSize: 24, color: 'var(--text)' }}>
            Calculate Your Fleet's Annual Retread Savings
          </h3>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 6, lineHeight: 1.5 }}>
            Adjust fleet parameters below to see immediate financial returns and environmental offsets.
          </p>
        </div>

        {/* Slider 1: Vehicles */}
        <div className="calc-group">
          <div className="calc-group-head">
            <span className="calc-label">Fleet Size (Commercial Vehicles)</span>
            <span className="calc-value-pill">{vehicles} Vehicles</span>
          </div>
          <input
            type="range"
            min="5"
            max="150"
            step="5"
            value={vehicles}
            onChange={e => setVehicles(Number(e.target.value))}
            className="calc-slider"
          />
        </div>

        {/* Slider 2: Wheels per Vehicle */}
        <div className="calc-group">
          <div className="calc-group-head">
            <span className="calc-label">Tyres per Vehicle Configuration</span>
            <span className="calc-value-pill">{tyresPerVehicle} Wheels</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            {[6, 10, 12, 14, 18].map(wh => (
              <button
                key={wh}
                type="button"
                className={'btn ' + (tyresPerVehicle === wh ? 'btn-solid' : 'btn-outline')}
                style={{ padding: '6px 12px', fontSize: 13, flex: 1 }}
                onClick={() => setTyresPerVehicle(wh)}
              >
                {wh}W
              </button>
            ))}
          </div>
        </div>

        {/* Slider 3: New Tyre Price */}
        <div className="calc-group">
          <div className="calc-group-head">
            <span className="calc-label">Average Benchmark Cost of New Tyre</span>
            <span className="calc-value-pill">₹{newTyreCost.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min="15000"
            max="32000"
            step="1000"
            value={newTyreCost}
            onChange={e => setNewTyreCost(Number(e.target.value))}
            className="calc-slider"
          />
        </div>

        {/* Slider 4: Retread Cycles */}
        <div className="calc-group">
          <div className="calc-group-head">
            <span className="calc-label">Retread Cycles per Casing</span>
            <span className="calc-value-pill">{retreadCycles} Cycles (3 Lives)</span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={retreadCycles}
            onChange={e => setRetreadCycles(Number(e.target.value))}
            className="calc-slider"
          />
        </div>
      </div>

      {/* Results Box */}
      <div className="calc-results-box">
        <div className="calc-highlight-metric">
          <span>Projected Fleet Savings</span>
          <b>₹{netSavings.toLocaleString('en-IN')}</b>
          <div style={{ fontSize: 13, color: 'var(--amber)', fontWeight: 600, marginTop: 4 }}>
            {savingsPercent}% Lower Tyre Budget vs 100% New Purchases
          </div>
        </div>

        <div className="calc-grid-metrics">
          <div className="calc-metric-cell">
            <span>Fleet Tyre Units</span>
            <b>{totalFleetTyres.toLocaleString()}</b>
          </div>
          <div className="calc-metric-cell">
            <span>Crude Oil Saved</span>
            <b>{oilSavedGallons.toLocaleString()} Gal</b>
          </div>
          <div className="calc-metric-cell">
            <span>Rubber Waste Prevented</span>
            <b>{rubberSavedKg.toLocaleString()} kg</b>
          </div>
          <div className="calc-metric-cell">
            <span>CO₂ Offset</span>
            <b>{co2SavedTonnes} Tonnes</b>
          </div>
        </div>

        <button
          className="btn btn-solid"
          style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}
          onClick={handleApply}
        >
          Lock in this Fleet Estimate →
        </button>
      </div>
    </div>
  )
}
