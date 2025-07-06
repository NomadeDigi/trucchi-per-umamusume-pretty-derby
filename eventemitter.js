// eventEmitter.js
// Simple Event Emitter implementation for subscribing and emitting events
// Educational purposes only

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => {
      try {
        listener(...args);
      } catch (e) {
        console.error(`Error in listener for event "${event}":`, e);
      }
    });
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}

// Example usage:
// const emitter = new EventEmitter();
// emitter.on('greet', name => console.log(`Hello, ${name}!`));
// emitter.emit('greet', 'NomadeDigi');

export default EventEmitter;
