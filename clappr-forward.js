class FastForward extends Clappr.UICorePlugin {
   get name() { return 'fast_forward' }
   get tagName() { return 'button' }
   get attributes() { return { class: 'fast-forward fast-forward-icon media-control-button' } }

   get events() {
      const events = { click: 'onClick' }
      return events
   }

   constructor(core) {
      super(core)
      this.bindEvents()
   }

   bindEvents() {
      this.stopListening(this.core)
      this.listenTo(this.core, Clappr.Events.CORE_ACTIVE_CONTAINER_CHANGED, this.onContainerChanged)
      this.listenTo(this.core, Clappr.Events.CORE_READY, this.bindMediaControlEvents)
   }

   bindMediaControlEvents() {
      this.stopListening(this.core.mediaControl)
      this.listenTo(this.core.mediaControl, Clappr.Events.MEDIACONTROL_RENDERED, this.render)
   }

   onContainerChanged() {
      this.container && this.stopListening(this.container)
      this.container = this.core.activeContainer
   }

   onClick() {
      this.core.getCurrentPlayback().seek(this.core.getCurrentPlayback().getCurrentTime() + 5)
   }

   show() {
      this.$el.show()
   }

   hide() {
      this.$el.hide()
   }

   render() {
      this.$el.html("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' class='bi bi-skip-forward' viewBox='0 0 16 16' id='IconChangeColor'> <path d='M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z' id='mainIconPathAttribute' filter='url(#shadow)'></path> <filter id='shadow'><feDropShadow id='shadowValue' stdDeviation='.5' dx='0' dy='0' flood-color='black'></feDropShadow></filter><filter id='shadow'><feDropShadow id='shadowValue' stdDeviation='.5' dx='0' dy='0' flood-color='black'></feDropShadow></filter></svg>");
      this.core.mediaControl && this.core.mediaControl.$('.media-control-left-panel').append(this.el)
      return this
   }
}


class RewindForward extends Clappr.UICorePlugin {
   get name() { return 'rewind_forward' }
   get tagName() { return 'button' }
   get attributes() { return { class: 'rewind-forward rewind-forward-icon media-control-button' } }

   get events() {
      const events = { click: 'onClick' }
      return events
   }

   constructor(core) {
      super(core)
      this.bindEvents()
   }

   bindEvents() {
      this.stopListening(this.core)
      this.listenTo(this.core, Clappr.Events.CORE_ACTIVE_CONTAINER_CHANGED, this.onContainerChanged)
      this.listenTo(this.core, Clappr.Events.CORE_READY, this.bindMediaControlEvents)
   }

   bindMediaControlEvents() {
      this.stopListening(this.core.mediaControl)
      this.listenTo(this.core.mediaControl, Clappr.Events.MEDIACONTROL_RENDERED, this.render)
   }

   onContainerChanged() {
      this.container && this.stopListening(this.container)
      this.container = this.core.activeContainer
   }

   onClick() {
      this.core.getCurrentPlayback().seek(this.core.getCurrentPlayback().getCurrentTime() - 5)
   }

   show() {
      this.$el.show()
   }

   hide() {
      this.$el.hide()
   }

   render() {
      this.$el.html("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' class='bi bi-skip-backward' viewBox='0 0 16 16' id='IconChangeColor'> <path d='M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z' id='mainIconPathAttribute'></path> </svg>");
      this.core.mediaControl && this.core.mediaControl.$('.media-control-left-panel').append(this.el)
      return this
   }
}