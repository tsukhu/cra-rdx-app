import React from "react";
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";
import "./PaginatedList.css";
const allData = new Array(25).fill(0).map((_val, i) => i + 1);
const perPage = 10;

const dataMachine = Machine({
  id: "dataMachine",
  initial: "loading",
  context: {
    data: [],
  },
  states: {
    loading: {
      invoke: {
        id: "dataLoader",
        src: (context, _event) => {
          return (callback, _onEvent) => {
            return setTimeout(() => {
              const { data } = context;
              const newData = allData.slice(data.length, data.length + perPage);
              const hasMore = newData.length === perPage;

              if (hasMore) {
                callback({ type: "DONE_MORE", newData });
              } else {
                callback({ type: "DONE_COMPLETE", newData });
              }
            }, 1000);
          };
        },
      },
      on: {
        DONE_MORE: {
          target: "more",
          actions: assign((context: any, event: any) => {
            return { data: [...context.data, ...event.newData] };
          }),
        },
        DONE_COMPLETE: {
          target: "complete",
          actions: assign((context: any, event: any) => {
            return { data: [...context.data, ...event.newData] };
          }),
        },
        FAIL: "failure",
      },
    },
    more: {
      on: {
        LOAD: "loading",
      },
    },
    complete: { type: "final" },
    failure: { type: "final" },
  },
});

const PaginatedList = () => {
  const [current, send] = useMachine(dataMachine);

  const { data } = current.context;
  return (
    <div className="paginated-list">
      <ul>
        {data.map((row) => (
          <li key={row} style={{ background: "orange" }}>
            {row}
          </li>
        ))}

        {current.matches("loading") && <li>Loading...</li>}

        {current.matches("more") && (
          <li style={{ background: "green" }}>
            <button
              onClick={() => {
                send("LOAD");
              }}
            >
              Load More
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PaginatedList;
