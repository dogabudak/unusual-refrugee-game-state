export function reduceWorld(state: WorldState): WorldState {
    let next = state
  
    next = applyCommands(next)
    next = advanceMovement(next)
    next = advanceInteractions(next)
  
    return {
      ...next,
      tick: state.tick + 1
    }
  }
  