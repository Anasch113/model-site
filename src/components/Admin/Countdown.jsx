import { useState, useEffect } from "react"

const Countdown = ({ createdAt }) => {
  const [secondsLeft, setSecondsLeft] = useState(20)

  useEffect(() => {
    if (!createdAt) return

    const expiry = new Date(createdAt).getTime() + 25 * 1000

    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, Math.floor((expiry - now) / 1000))
      setSecondsLeft(diff)
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [createdAt])

  return <span>{secondsLeft}s</span>
}


export default Countdown
