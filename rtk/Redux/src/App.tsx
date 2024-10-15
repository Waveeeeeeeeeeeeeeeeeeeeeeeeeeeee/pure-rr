import { CounterId, AppState, useAppSelector } from "./store";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch } from "react-redux";

function App() {
	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<Counter counterId="First" />
				<Counter counterId="Second" />
				<Counter counterId="Third" />
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

function Counter({ counterId }: { counterId: CounterId }) {
	const dispatch = useDispatch();
	const counterState = useAppSelector(
		(state: AppState) => state.counters[counterId],
	);
	return (
		<>
			counter {counterState?.counter ?? 0}
			<button
				onClick={() =>
					dispatch({
						type: "increment",
						payload: { counterId },
					})
				}
			>
				increment
			</button>
			<button
				onClick={() =>
					dispatch({
						type: "decrement",
						payload: { counterId },
					})
				}
			>
				decrement
			</button>
			<p>
				Edit <code>src/App.tsx</code> and save to test HMR
			</p>
		</>
	);
}

export default App;
