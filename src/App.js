import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    async function f1drivers() {
      try {
        const resp = await fetch('https://api.openf1.org/v1/drivers');
        const data = await resp.json();

        const uniqueDriversMap = new Map();

        const uniqueDrivers = data.filter(driver => {
          if (!uniqueDriversMap.has(driver.full_name)) {
            uniqueDriversMap.set(driver.full_name, true);
            return true;
          }
          return false;
        })

        setDrivers(uniqueDrivers);
        console.log(uniqueDrivers);

      } catch (error) {
        console.error('OOOOpsssss theres an error', error)
      }

    }

    f1drivers();

  }, [])
  return (
    <div className="grid-block">
      <h1>Formula 1 Drivers</h1>
      {drivers.map((driver, index) => (
        <div key={index} style={{ backgroundColor: '#' + driver.team_colour }} >
          <img src={driver.headshot_url} alt='driver' />
          <p>Driver Name: {driver.full_name}</p>
          <p>Team Name: {driver.team_name}</p>
        </div>
      )
      )}
    </div>
  );
}

export default App;
