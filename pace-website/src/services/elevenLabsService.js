import { Conversation } from '@elevenlabs/client';

class ElevenLabsService {
  constructor() {
    this.conversation = null;
    this.agentId = 'agent_4701k28hw2jvfj79kkypdbhyd93m';
    this.isConnected = false;
    this.callbacks = {
      onMessage: null,
      onStatusChange: null,
      onError: null
    };
  }

  // Set callbacks for conversation events
  setCallbacks(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  // Get dynamic variables from localStorage (demo athlete's stats)
  getDynamicVariables() {
    const savedSettings = localStorage.getItem('paceAthleteSettings');
    const defaultSettings = {
      height: '70',
      weight: '160',
      event: 'Sprints',
      time_in_the_season: 'In-Season',
      training_schedule: '5',
      current_pr: '11.25',
      goal_pr: '10.95',
      name: 'Alex Johnson'
    };

    const settings = savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    
    // Return dynamic variables in the format expected by ElevenLabs
    return {
      user_name: settings.name,
      height: settings.height,
      weight: settings.weight,
      event: settings.event,
      time_in_the_season: settings.time_in_the_season,
      training_schedule: settings.training_schedule,
      current_pr: settings.current_pr,
      goal_pr: settings.goal_pr
    };
  }

  // Start conversation with dynamic variables following ElevenLabs docs
  async startConversation() {
    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });

      if (this.callbacks.onStatusChange) {
        this.callbacks.onStatusChange('connecting');
      }

      // Get dynamic variables for the demo athlete
      const dynamicVariables = this.getDynamicVariables();
      
      console.log('Starting ElevenLabs conversation with agent ID:', this.agentId);
      console.log('Dynamic variables:', dynamicVariables);

      // Start ElevenLabs conversation following their documentation
      this.conversation = await Conversation.startSession({
        agentId: this.agentId,
        dynamicVariables: dynamicVariables,
        
        // Callback for when messages are received
        onMessage: (message) => {
          console.log('Message received from ElevenLabs:', message);
          if (this.callbacks.onMessage) {
            this.callbacks.onMessage(message);
          }
        },
        
        // Callback for status changes
        onStatusChange: (status) => {
          console.log('ElevenLabs status changed:', status);
          this.isConnected = status === 'connected';
          if (this.callbacks.onStatusChange) {
            this.callbacks.onStatusChange(status);
          }
        },
        
        // Callback for errors
        onError: (error) => {
          console.error('ElevenLabs conversation error:', error);
          if (this.callbacks.onError) {
            this.callbacks.onError(error);
          }
        },

        // Additional callbacks that might be useful
        onConnect: () => {
          console.log('ElevenLabs conversation connected');
          this.isConnected = true;
          if (this.callbacks.onStatusChange) {
            this.callbacks.onStatusChange('connected');
          }
        },

        onDisconnect: () => {
          console.log('ElevenLabs conversation disconnected');
          this.isConnected = false;
          if (this.callbacks.onStatusChange) {
            this.callbacks.onStatusChange('disconnected');
          }
        }
      });

      console.log('ElevenLabs conversation started successfully');
      return true;

    } catch (error) {
      console.error('Failed to start conversation:', error);
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
      return false;
    }
  }

  // End the conversation
  async endConversation() {
    try {
      if (this.conversation) {
        await this.conversation.endSession();
        this.conversation = null;
        this.isConnected = false;
        console.log('ElevenLabs conversation ended');
        
        if (this.callbacks.onStatusChange) {
          this.callbacks.onStatusChange('disconnected');
        }
      }
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  }

  // Toggle mute
  async toggleMute() {
    try {
      if (this.conversation) {
        await this.conversation.setMuted(!this.conversation.isMuted);
        return this.conversation.isMuted;
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
    return false;
  }

  // Get connection status
  isConversationActive() {
    return this.isConnected && this.conversation !== null;
  }
}

// Export a singleton instance
const elevenLabsService = new ElevenLabsService();
export default elevenLabsService;

