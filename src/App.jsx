import TaksForm from './components/TaksForm'
import TaskList from './components/TaskList'

import './App.css'

import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='bg-zinc-900 h-screen text-white'>
      <div className='flex items-center justify-center h-full'>

      <Browser>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<TaksForm />} />
          <Route path='/edit-task/:taskId' element={<TaksForm />} />
        </Routes>
      </Browser>
      </div>
    </div>
  )
}

export default App
