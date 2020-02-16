export default (state, { x, y }) => {
  const currentPosition = Object.assign({}, state.player.position)
  const nextPosition = { x: currentPosition.x + x, y: currentPosition.y + y }
  const playerSize = Object.assign({}, state.player.size)
  const currentEdgesPosition = {
    leftX: currentPosition.x - (playerSize.width / 2),
    rightX: currentPosition.x + (playerSize.width / 2),
    bottomY: currentPosition.y,
    topY: currentPosition.y + playerSize.height
  }
  const currentSidesRelativeToCollidingObjectArray = []
  const targetObjects = [].concat(
    state.objects.blocks
  )

  const collidingObjects = targetObjects.filter(object => {
    const objectPosition = {
      x: object.data.positionX,
      y: object.data.positionY
    }
    const objectSize = {
      width: object.data.width,
      height: object.data.height
    }
    const objectEdgesPosition = {
      leftX: objectPosition.x,
      rightX: objectPosition.x + objectSize.width,
      bottomY: objectPosition.y,
      topY: objectPosition.y + objectSize.height
    }

    const horizontalDistance = Math.abs(
      nextPosition.x - (objectPosition.x + objectSize.width / 2)
    )
    const horizontalCollisionDistance = (playerSize.width + objectSize.width) / 2
    const verticalDistance = Math.abs(
      (nextPosition.y + playerSize.height / 2) - (objectPosition.y + objectSize.height / 2)
    )
    const verticalCollisionDistance = (playerSize.height + objectSize.height) / 2
    const horizontalColliding = horizontalDistance < horizontalCollisionDistance
    const verticalColliding = verticalDistance < verticalCollisionDistance
    if (horizontalColliding && verticalColliding) {
      const beforeCollidingSides = {
        left: objectEdgesPosition.rightX <= currentEdgesPosition.leftX,
        right: currentEdgesPosition.rightX <= objectEdgesPosition.leftX,
        top: currentEdgesPosition.topY <= objectEdgesPosition.bottomY,
        bottom: objectEdgesPosition.topY <= currentEdgesPosition.bottomY
      }
      if (!beforeCollidingSides.right && !beforeCollidingSides.left && !beforeCollidingSides.bottom && !beforeCollidingSides.top) {
        const horizontalCollidingLength = ((playerSize.width + objectSize.width) / 2) - horizontalDistance
        const verticalCollidingLength = ((playerSize.height + objectSize.height) / 2) - verticalDistance
        if (horizontalCollidingLength <= verticalCollidingLength) {
          if (currentPosition.x <= objectPosition.x) {
            beforeCollidingSides.left = true
          } else {
            beforeCollidingSides.right = true
          }
        } else {
          if (currentPosition.y <= objectPosition.y) {
            beforeCollidingSides.bottom = true
          } else {
            beforeCollidingSides.top = true
          }
        }
      }
      currentSidesRelativeToCollidingObjectArray.push(beforeCollidingSides)
      return true
    }
    return false
  })

  if (collidingObjects.length > 0) {
    collidingObjects.forEach((collidingObject, i) => {
      const objectPosition = {
        x: collidingObject.data.positionX,
        y: collidingObject.data.positionY
      }
      const width = collidingObject.data.width
      const height = collidingObject.data.height
      const objectEdgesPosition = {
        leftX: objectPosition.x,
        rightX: objectPosition.x + width,
        bottomY: objectPosition.y,
        topY: objectPosition.y + height
      }

      const currentSidesRelativeToCollidingObject = currentSidesRelativeToCollidingObjectArray[i]
      if (currentSidesRelativeToCollidingObject.left) {
        nextPosition.x = objectEdgesPosition.rightX + (playerSize.width / 2)
      } else if (currentSidesRelativeToCollidingObject.right) {
        nextPosition.x = objectEdgesPosition.leftX - (playerSize.width / 2)
      }
      if (currentSidesRelativeToCollidingObject.top) {
        nextPosition.y = objectEdgesPosition.bottomY - playerSize.height
      } else if (currentSidesRelativeToCollidingObject.bottom) {
        nextPosition.y = objectEdgesPosition.topY
      }
    })
  }

  return {
    x: nextPosition.x - currentPosition.x,
    y: nextPosition.y - currentPosition.y
  }
}
