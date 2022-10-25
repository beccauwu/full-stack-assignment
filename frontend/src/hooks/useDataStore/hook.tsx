import ApiClient from "api/Client";
import { useEffect, useReducer, useRef } from "react";
import { Action, Cache, ErrorWithStatus, State } from "types";

/**
 * 
 * @type T - the type of data used
 * @param endpoint The endpoint to fetch data from
 * @returns state with data, loading, error and crud functions
 */
function useDataStore<T extends { id: number }>(endpoint: string): State<T> {
  const initialState = {
    data: undefined,
    loading: false,
    error: undefined,
  };
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);
  const dataReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return {
          ...state,
          loading: true,
        };
      case "data":
        return {
          ...state,
          data: action.payload?.data,
          loading: false,
        };
      case "error":
        return {
          ...state,
          errors: [
            ...(state.errors || []),
            action.payload?.error as ErrorWithStatus,
          ],
          loading: false,
        };
      case "initial":
        return {
          ...state,
          delete: action.payload?.delete,
          create: action.payload?.create,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(dataReducer, initialState);
  useEffect(() => {
    const api = new ApiClient<T>(endpoint);
    const deleteObject = async (ids: number[]) => {
      dispatch({ type: "loading" });
      const responses = await Promise.all(ids.map((id) => api.removeData(id)));
      const okay = responses.every((response) => response.ok);
      if (!okay) {
        responses
          .filter((response) => !response.ok)
          .forEach((response) => {
            const e = new ErrorWithStatus(response.statusText);
            e.status = response.status;
            return dispatch({ type: "error", payload: { error: e } });
          });
      }
      const newState = state.data?.filter(
        (object) => !ids.includes(object.id)
      ) as T[];
      cache.current[endpoint] = newState;
      dispatch({
        type: "data",
        payload: {
          data: newState,
        },
      });
    };
    const createObject = async (object: Omit<T, "id">) => {
      dispatch({
        type: "loading",
      });
      try {
        const response = await api.sendData(object);
        console.log(response);
        if (!response.ok) {
          console.log(response);
          const e = new ErrorWithStatus(response.statusText);
          e.status = response.status;
          throw e;
        }
        const data = await response.json();
        const newState = [...(state.data as T[]), data as T];
        cache.current[endpoint] = newState;
        dispatch({
          type: "data",
          payload: {
            data: newState,
          },
        });
      } catch (e) {
        const error = e as ErrorWithStatus;
        dispatch({
          type: "error",
          payload: {
            error: error,
          },
        });
      }
    };
    // push delete/create methods to state
    dispatch({
      type: "initial",
      payload: {
        delete: deleteObject,
        create: createObject,
      },
    });
  }, [endpoint, state.data]);
  useEffect(() => {
    cancelRequest.current = false;
    const api = new ApiClient<T>(endpoint);
    // check cache for data
    const fetchData = async () => {
      dispatch({ type: "loading" });
      if (cache.current[endpoint]) {
        dispatch({ type: "data", payload: { data: cache.current[endpoint] } });
        return;
      }
      try {
        const response = await api.getData();
        if (!response.ok) {
          const e = new ErrorWithStatus(response.statusText);
          e.status = response.status;
          throw e;
        }
        const data = await response.json();
        cache.current[endpoint] = data;
        if (cancelRequest.current) return;
        dispatch({ type: "data", payload: { data } });
      } catch (error) {
        if (cancelRequest.current) return;
        const e = error as ErrorWithStatus;
        dispatch({ type: "error", payload: { error: e } });
      }
    };
    void fetchData();
    return () => {
      cancelRequest.current = true;
    };
  }, [endpoint, state.data]);
  return state;
}

export default useDataStore;
