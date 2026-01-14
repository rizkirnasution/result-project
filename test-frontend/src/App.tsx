import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Soal1 from './soal/Soal-1'
import Soal2 from './soal/Soal-2'
import Soal3 from './soal/Soal-3'
import Soal4 from './soal/Soal-4'

function App() {
  const [selectedSoal, setSelectedSoal] = useState(1);

  const listItemSoal1 = ["Apple", "Banana", "Cherry"];

  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ];

  return (
    <>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ marginRight: "8px" }}>Pilih Soal:</label>
        <select
          value={selectedSoal}
          onChange={(e) => setSelectedSoal(Number(e.target.value))}
        >
          <option value={1}>Soal 1</option>
          <option value={2}>Soal 2</option>
          <option value={3}>Soal 3</option>
          <option value={4}>Soal 4</option>
        </select>
      </div>

      {selectedSoal === 1 && <Soal1 items={listItemSoal1} />}
      {selectedSoal === 2 && <Soal2 />}
      {selectedSoal === 3 && <Soal3 />}
      {selectedSoal === 4 && <Soal4 items={items} itemsPerPage={2} />}

    </>
  )
}

export default App
