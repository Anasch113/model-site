import { useState, useEffect } from "react"

const Countdown = ({ createdAt, seconds }) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds)

  useEffect(() => {
    if (!createdAt || !seconds) return

    // Parse createdAt once
    const startTime = new Date(createdAt).getTime()
    const expiry = startTime + seconds * 1000

    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, Math.floor((expiry - now) / 1000))
      setSecondsLeft(diff)
    }

    tick() // initial calculation

    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [createdAt, seconds]) // ✅ reset if createdAt OR seconds changes

  return <span>{secondsLeft}s</span>
}

export default Countdown
