import { processPhysicalInteraction } from './hybridCoordinator.js';

export async function handleQrInteraction(interactionId, interactionRegistry) {
  const interaction = interactionRegistry.find(item => item.interactionId === interactionId);

  if (!interaction) {
    return {
      success: false,
      message: 'Interaction not found'
    };
  }

  processPhysicalInteraction(interaction);

  return {
    success: true,
    unlockedReward: interaction.digitalReward
  };
}
