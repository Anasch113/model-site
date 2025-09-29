import React, { useEffect, useState } from 'react'
import AdminWrapper from '../../components/Admin/AdminWrapper'
import axios from 'axios'
import Countdown from "../../components/Admin/Countdown"
const AdminReview = () => {
  const [pendingMessages, setPendingMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const SERVER_URL = import.meta.env.VITE_SERVER_URL
  
const fetchPending = async () => {
  setLoading(true)
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/adminMessages/pending`)
    const data = await res.data
    
    setPendingMessages(prev => {
      // keep existing messages, add only new ones
      const existingIds = new Set(prev.map(m => m.id))
      const newOnes = data.filter(m => !existingIds.has(m.id))
      return [...prev, ...newOnes] // append at bottom
    })
  } catch (err) {
    console.error('Error fetching pending messages', err)
  }
  setLoading(false)
}


  const approveMessage = async (id, editedText) => {
    try {
      await fetch(`${SERVER_URL}/adminMessages/approve/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ edited_text: editedText })
      })
      // remove approved message from state
      setPendingMessages(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      console.error('Error approving message', err)
    }
  }

  useEffect(() => {
    fetchPending()
    const interval = setInterval(fetchPending, 3000) // auto refresh every 5s
    return () => clearInterval(interval)
  }, [])
  console.log("Pending messages", pendingMessages)

  return (
    <AdminWrapper>
      <h1 className="text-2xl font-bold mb-4">Admin Review</h1>
      <div className="bg-bg-color shadow rounded-lg overflow-x-auto p-4">
        {loading && <p>Loading...</p>}
        {!loading && pendingMessages.length === 0 && (
          <p className="text-gray-500">No pending messages 🎉</p>
        )}
        {pendingMessages.map((msg) => (
          <div key={msg.id} className="mb-4 p-4 border rounded-lg bg-bg-light3 shadow-sm">
            <p className="mb-2"><strong>Chat ID:</strong> {msg.chat_id}</p>
            <p className="mb-2"><strong>User Nickname:</strong> {msg.nickname}</p>
            {/* <p className="mb-2"><strong>Message:</strong> {msg.original_text}</p> */}
            <textarea
              className="w-full border rounded p-2 mb-2 bg-bg-color"
              defaultValue={msg.original_text}
              onChange={(e) => msg._edited = e.target.value}
              rows={8}
            />
            <small className="text-gray-500">
              Auto-sending in <Countdown createdAt={msg.created_at} />
            </small>

            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => approveMessage(msg.id, msg._edited || msg.original_text)}
              >
                Approve
              </button>
            </div>

          </div>
        ))}

      </div>
    </AdminWrapper>
  )
}

export default AdminReview
