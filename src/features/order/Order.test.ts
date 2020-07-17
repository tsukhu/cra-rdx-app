import order, {
  orderInitialState,
  chooseBase,
  chooseCheese,
  chooseCrust,
  chooseSauce,
} from "./OrderSlice";

describe("Order Reducer", () => {

  it("should handle undefined initial state", () => {
    expect(order(undefined, { type: "init" })).toEqual(orderInitialState);
  });

  it("should handle undefined initial state - choose base", () => {
    expect(order(undefined, chooseBase("big"))).toEqual({
      ...orderInitialState,
      base: "big",
    });
  });
  it("should handle defined initial state - choose base", () => {
    expect(
      order({ ...orderInitialState, base: "xtra large" }, chooseBase("big"))
    ).toEqual({ ...orderInitialState, base: "big" });
  });
  it("should handle undefined initial state - choose cheese", () => {
    expect(order(undefined, chooseCheese("extra_cheese"))).toEqual({
      ...orderInitialState,
      cheese: "extra_cheese",
    });
  });
  it("should handle defined initial state - choose cheese", () => {
    expect(
      order(
        { ...orderInitialState, cheese: "some_cheese" },
        chooseCheese("more_cheese")
      )
    ).toEqual({ ...orderInitialState, cheese: "more_cheese" });
  });
  it("should handle undefined initial state - choose crust", () => {
    expect(order(undefined, chooseCrust("low"))).toEqual({
      ...orderInitialState,
      crust: "low",
    });
  });
  it("should handle defined initial state - choose crust", () => {
    expect(
      order(
        { ...orderInitialState, crust: "basic" },
        chooseCrust("pan_crust")
      )
    ).toEqual({ ...orderInitialState, crust: "pan_crust" });
  });
  it("should handle undefined initial state - choose sauce", () => {
    expect(order(undefined, chooseSauce("no_sauce"))).toEqual({
      ...orderInitialState,
      sauce: "no_sauce",
    });
  });
  it("should handle defined initial state - choose sauce", () => {
    expect(
      order(
        { ...orderInitialState, sauce: "lots_of_sauce" },
        chooseSauce("lots_of_sauce")
      )
    ).toEqual({ ...orderInitialState, sauce: "lots_of_sauce" });
  });
});
