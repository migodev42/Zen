// Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list
import { useRef } from 'react'
// import clamp from 'lodash-es/clamp'
// import swap from 'lodash-move'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'
import './style.css'

function swap(array, moveIndex, toIndex) {
  /* #move - Moves an array item from one position in an array to another.
     Note: This is a pure function so a new array will be returned, instead
     of altering the array argument.
    Arguments:
    1. array     (String) : Array in which to move an item.         (required)
    2. moveIndex (Object) : The index of the item to move.          (required)
    3. toIndex   (Object) : The index to move item at moveIndex to. (required)
  */
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length)
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length)
    ];
  }
  return array;
}

function clamp(number, lower, upper) {
  number = +number
  lower = +lower
  upper = +upper
  lower = lower === lower ? lower : 0
  upper = upper === upper ? upper : 0
  if (number === number) {
    number = number <= upper ? number : upper
    number = number >= lower ? number : lower
  }
  return number
}
// Returns fitting styles for dragged/idle items
/* 
const fn = (order, active, originalIndex, curIndex, y) => (index) =>
  active && index === originalIndex
    ? { y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: (n) => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false } 
*/
const itemWitdh = 330
const fn = (order, active, originalIndex, curIndex, x) => (index) =>
  active && index === originalIndex
    ? { x: curIndex * 330 + x, scale: 1.1, zIndex: '1', shadow: 15, immediate: (n) => n === 'x' || n === 'zIndex' }
    : { x: order.indexOf(index) * 330, scale: 1, zIndex: '0', shadow: 1, immediate: false }

function DragableCardList({ items }) {
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order

  const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const containerRef = useRef(null)
  const bind = useDrag(({ event, args: [originalIndex], active, movement: [x, y] }) => {
    console.log('contariner useDrag', event)
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 330 + x) / 330), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    setSprings(fn(newOrder, active, originalIndex, curIndex, x)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!active) order.current = newOrder
  }, {
    // domTarget: containerRef,
    // eventOptions: { passive: false },
  })

  return (
    // style={{ height: items.length * 330 }}
    <div className="content" ref={containerRef}>
      {springs.map(({ zIndex, shadow, x, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to((s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            x,
            scale
          }}
          children={items[i]}
          onClick={(e) => {
            console.log('container', e)
          }}
          onDragStart={(e) => {
            console.log('container onDragStart', e)
          }

          }
        />
      ))}
    </div>
  )
}

export default DragableCardList