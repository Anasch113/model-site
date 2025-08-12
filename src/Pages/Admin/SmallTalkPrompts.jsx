import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaDownload } from 'react-icons/fa';
import AdminDashboard from './AdminDashboard';
import AdminWrapper from '../../components/Admin/AdminWrapper';
import axios from 'axios';
import toast from 'react-hot-toast';

const SmallTalkPrompts = ({ promptName = "lady_ivy_small_talk" }) => {

    const [systemPrompt, setSystemPrompt] = useState('');
    const [userPromptTemplate, setUserPromptTemplate] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/admin-route/prompts/${promptName}`)
            .then(res => {
                setSystemPrompt(res.data.system_prompt);
                setUserPromptTemplate(res.data.user_prompt_template);
                setLoading(false);
            })
            .catch(() => setMessage("Failed to load prompt."));
    }, [promptName]);

    const handleSave = () => {
        setSaving(true);
        axios.put(`${import.meta.env.VITE_SERVER_URL}/admin-route/prompts/${promptName}`, {
            system_prompt: systemPrompt,
            user_prompt_template: userPromptTemplate
        })
            .then(() => setMessage("✅ Prompt updated successfully"))
            .catch(() => setMessage("❌ Failed to update prompt"))
            .finally(() => setSaving(false));
    };

    if (loading) return <p>Loading prompt...</p>;

    return (
        <AdminWrapper >
            <h1 className="text-2xl font-bold mb-4">Small Talk Prompts</h1>
            <div className="bg-bg-color shadow rounded-lg overflow-x-auto">
                <div className="p-4 md:max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">Edit Prompt: {promptName}</h2>
                    {message && <p className="mb-2 text-sm text-green-700">{message}</p>}

                    <label className="block font-semibold mb-1 ">Small Talk System Prompt</label>
                    <textarea
                        className="w-full p-2 rounded-md mb-4 h-56 bg-bg-light3"
                        value={systemPrompt}
                        onChange={e => setSystemPrompt(e.target.value)}
                    />
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </AdminWrapper>
    )
}

export default SmallTalkPrompts
