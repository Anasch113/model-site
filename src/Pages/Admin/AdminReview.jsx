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
      const res = await axios.get(`${SERVER_URL}/adminMessages/pending`)
      const data = await res.data

      setPendingMessages(prev => {
        const serverIds = new Set(data.map(m => m.id))

        // keep only those still on server
        const stillPending = prev.filter(m => serverIds.has(m.id))

        // add new ones
        const existingIds = new Set(stillPending.map(m => m.id))
        const newOnes = data.filter(m => !existingIds.has(m.id))

        return [...stillPending, ...newOnes] // always matches server
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


  const startEditing = async (id) => {
    try {
      await fetch(`${SERVER_URL}/adminMessages/edit/${id}`, {
        method: 'POST'
      })
      // Optional: update local state so UI reflects editing state
      setPendingMessages(prev =>
        prev.map(m => m.id === id ? { ...m, status: 'editing' } : m)
      )
    } catch (err) {
      console.error('Error starting edit', err)
    }
  }



  return (
    <AdminWrapper>
      <h1 className="text-2xl font-bold mb-4">Admin Review</h1>
      <div className="bg-bg-color shadow rounded-lg overflow-x-auto p-4">
        {/* {loading && <p>Loading...</p>} */}

        {pendingMessages.length === 0 && (
          <p className="text-gray-500">No pending messages 🎉</p>
        )}
        {pendingMessages.map((msg) => (
          <div key={msg.id} className="mb-4 p-4 border rounded-lg bg-bg-light3 shadow-sm">
            <p className="mb-2"><strong>Chat ID:</strong> {msg.chat_id}</p>
            <p className="mb-2"><strong>User Nickname:</strong> {msg.nickname}</p>
            {/* <p className="mb-2"><strong>Message:</strong> {msg.original_text}</p> */}

            <div className='border my-4 p-4 rounded-md flex flex-col gap-6'>
              <p> <strong>User Message:</strong><br /> {msg.debug_info.original_user_message}</p>
              <p><strong>GPT Enhanced Response:</strong> <br /> {msg?.debug_info?.gpt_enhanced_german_response_ ? msg.debug_info.gpt_enhanced_german_response_ : "N/A"}</p>

              <p><strong>Raw Model Response:</strong> <br /> {msg?.debug_info?.raw_model_response ? msg.debug_info.raw_model_response : "N/A"}</p>

              <p><strong>Additional Debug Info:</strong> <br /> {msg?.debug_info?.debug_info ? msg.debug_info.debug_info : "N/A"}</p>
            </div>


            <textarea
              className="w-full border rounded p-2 mb-2 bg-bg-color"
              defaultValue={msg.original_text}
              onChange={(e) => msg._edited = e.target.value}
              rows={6}
            />
            <small className="text-gray-500">

              {msg.status === "editing"
                ? <>Editing... Auto-sending in <Countdown createdAt={msg.created_at} seconds={60} /></>
                : <>Auto-sending in <Countdown createdAt={msg.created_at} seconds={10} /></>
              }

            </small>

            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                onClick={() => startEditing(msg.id)}
              >
                Edit
              </button>

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
