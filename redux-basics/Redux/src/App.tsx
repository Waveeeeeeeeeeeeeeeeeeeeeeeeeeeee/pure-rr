import { store, CounterId, AppState } from "./store";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useReducer, useRef } from "react";

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

const selectCounters = (state: AppState, counterId: CounterId) =>
	state.counters[counterId] ?? { counter: 0 };

function Counter({ counterId }: { counterId: CounterId }) {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	const lastStateRef = useRef(selectCounters(store.getState(), counterId));
	console.log("render", counterId);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const currentState = selectCounters(store.getState(), counterId);
			const lastState = lastStateRef.current;
			if (currentState !== lastState) {
				forceUpdate();
			}

			lastStateRef.current = currentState;
		});

		return unsubscribe;
	}, [counterId, forceUpdate]);

	const counterState = selectCounters(store.getState(), counterId);

	return (
		<>
			counter {counterState.counter ?? 0}
			<button
				onClick={() =>
					store.dispatch({
						type: "increment",
						payload: { counterId },
					})
				}
			>
				increment
			</button>
			<button
				onClick={() =>
					store.dispatch({
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
