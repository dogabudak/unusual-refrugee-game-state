import { reduceWorld } from "./reducer";
import { WorldState } from '../types/game';

async function loadWorld(worldId: string): Promise<WorldState> {
    // Placeholder for loading world state from the database
    console.log(`Loading world ${worldId}`);
    return { id: worldId, tick: 0, players: [], units: [], buildings: [] }; // Return a dummy initial state
}

async function saveWorld(state: WorldState): Promise<void> {
    // Placeholder for saving world state to the database
    console.log(`Saving world ${state.id} at tick ${state.tick}`);
}

async function enqueueNextTick(worldId: string, nextTick: number): Promise<void> {
    // Placeholder for enqueuing the next tick
    console.log(`Enqueuing next tick for world ${worldId} at tick ${nextTick}`);
}

export async function runTick(worldId: string) {
    const state = await loadWorld(worldId);
  
    const next = reduceWorld(state);
  
    await saveWorld(next);
  
    await enqueueNextTick(worldId, next.tick);
}