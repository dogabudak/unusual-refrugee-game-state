import {reduceWorld} from "./reducer"

export async function runTick(worldId: string) {
    const state = await loadWorld(worldId)
  
    const next = reduceWorld(state)
  
    await saveWorld(next)
  
    await enqueueNextTick(worldId, next.tick)
  }