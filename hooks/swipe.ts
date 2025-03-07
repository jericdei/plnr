import { Dimensions, GestureResponderEvent } from "react-native";
const windowWidth = Dimensions.get("window").width;

type SwipeCallback = () => void;

export function useSwipe(
  onSwipeLeft?: SwipeCallback,
  onSwipeRight?: SwipeCallback,
  rangeOffset = 4
) {
  let firstTouch = 0;

  function onTouchStart(e: GestureResponderEvent) {
    firstTouch = e.nativeEvent.pageX;
  }

  function onTouchEnd(e: GestureResponderEvent) {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX;
    const range = windowWidth / rangeOffset;

    // check if position is growing positively and has reached specified range
    if (positionX - firstTouch > range) {
      onSwipeRight?.();
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionX > range) {
      onSwipeLeft?.();
    }
  }

  return { onTouchStart, onTouchEnd };
}
