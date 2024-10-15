import { configureStore } from "@reduxjs/toolkit";

export type CounterState = {
	counter: number;
};

export type CounterId = string;

export type State = {
	counters: Record<CounterId, CounterState | undefined>;
};

export type IncrementAction = {
	type: "increment";
	payload: {
		counterId: CounterId;
	};
};

export type DecrementAction = {
	type: "decrement";
	payload: {
		counterId: CounterId;
	};
};

export type Action = IncrementAction | DecrementAction;

const initialState: State = {
	counters: {},
};

const initialCounterState: CounterState = { counter: 0 };

const reducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case "increment": {
			const { counterId } = action.payload;
			const currentCounter =
				state.counters[counterId] ?? initialCounterState;
			return {
				...state,
				counters: {
					...state.counters,
					[counterId]: {
						...currentCounter,
						counter: currentCounter.counter + 1,
					},
				},
			};
		}
		case "decrement": {
			const { counterId } = action.payload;
			const currentCounter =
				state.counters[counterId] ?? initialCounterState;
			return {
				...state,
				counters: {
					...state.counters,
					[counterId]: {
						...currentCounter,
						counter: currentCounter.counter - 1,
					},
				},
			};
		}

		default:
			return state;
	}
};
export const store = configureStore({
	reducer: reducer,
	preloadedState: initialState,
});

export type AppState = ReturnType<typeof store.getState>;
