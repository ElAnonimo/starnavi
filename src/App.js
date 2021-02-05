import React, {
  useState,
  useEffect,
  useRef,
  Fragment
} from "react";
import { v4 as uuidv4 } from "uuid";
import Cell from "./components/Cell";
import "./App.scss";

const rows = 5;
const cols = 5;
const statItems = 5;

const App = () => {
  const [cellSizes, setCellSizes] = useState({});
  const [cellClassName, setCellClassName] = useState("size5");
  const [stats, setStats] = useState([]);

  const selectRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://demo1030918.mockable.io/");
      const data = await res.json();
      return data;
    };

    fetchData()
      .then(data => setCellSizes(data))
      .catch(ex => console.log("error fetching data:", ex));
  }, []);


  const onBtnClick = () => {
    setCellClassName(`size${selectRef.current?.value}`);
  };

  const onMouseOver = (rowIdx, colIdx) => {
    if (stats.length >= statItems) {
      stats.push({ rowIdx: rowIdx + 1, colIdx: colIdx + 1 });
      stats.shift();
      setStats([...stats]);
    } else {
      setStats([...stats, { rowIdx: rowIdx + 1, colIdx: colIdx + 1 }]);
    }
  };

  const splitName = str => {
    return str.replace(/[A-Z]/g, match => ` ${match}`.toLowerCase());
  };

  const grid = [];

  for (let row = 0; row < rows; row++) {
    const currRow = [];
    for (let col = 0; col < cols; col++) {
      currRow.push(col);
    }
    grid.push(currRow);
  }

  return (
    <div className="container">
      {Object.keys(cellSizes)?.length > 0 && (
        <Fragment>
          <div className="grid-content">
            <div className="controls">
              <select
                className="cell-size"
                name="cellSize"
                ref={selectRef}
                defaultValue="Pick mode"
              >
                <option value="Pick mode" disabled hidden>Pick mode</option>
                {Object.keys(cellSizes).map(mode => <option value={cellSizes?.[mode].field} key={mode}>{splitName(mode)}</option>)}
              </select>
              <input
                className="start-input"
                type="button"
                value="start"
                onClick={onBtnClick}
              />
            </div>
            {grid.length > 0 && (
              <div className="grid">
                {grid.map((row, rowIdx) => {
                  return (
                    <div className="row" key={rowIdx}>
                      {row.map((col, colIdx) => {
                        return (
                          <Cell
                            key={colIdx}
                            className={cellClassName}
                            onMouseOver={() => onMouseOver(rowIdx, colIdx)}
                          />
                        )
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="stats">
            <h3 className="stats-title">History</h3>
            {stats.length > 0 && (
              <div className="stats-data">
                {stats.map(item => {
                  return (
                    <div className="stats-item" key={uuidv4()}>
                      <span>row {item.rowIdx} </span>
                      <span>col {item.colIdx}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default App;
