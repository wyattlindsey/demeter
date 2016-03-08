let AppDispatcher = require('../dispatcher/app-dispatcher')
let EventEmitter = require('events').EventEmitter
let THREE = require('three')
let ApplicationConstants = require('../constants/application-constants')
let ViewportConstants = require('../constants/viewport-constants')


let CHANGE_EVENT = 'change'

let ViewportStore = Object.assign({}, EventEmitter.prototype, {
  state: {
    scene: {
      name: 'my-scene',
      objects: [
        {
          geometry: new THREE.BoxGeometry( 1, 1, 1 ),
          material: new THREE.MeshLambertMaterial( { color: 0x8ead86 } ),
          position: new THREE.Vector3(-3,1,0)
        }
      ],

      cameraData: {
        position: {},
        rotation: {},
        scale: {}
      }
    },
    time: {
      hour: 11,
      minute: 30
    },
    date: {
      day: 10,
      month: 11,
      year: 2016
    },
    location: {
      latitude: 45,
      longitude: -122
    }
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  dispatchToken: AppDispatcher.register(function(action) {
    switch (action.actionType) {
      case ViewportConstants.CREATE_OBJECT:
        createObject(action.objectData)
        break
      case ViewportConstants.SET_TIME:
        setTime(action.time)
        break
      case ViewportConstants.SAVE_CAMERA_DATA:
        saveCameraData(action.cameraData)
      default:
      //no op
    }

    return true
  }),

  getSceneObjects: function() {
    return this.state.scene.objects
  },

  getCurrentTime: function() {
    return this.state.time
  },

  getCurrentDate: function() {
    return this.state.date
  },

  getCurrentLocation: function() {
    return this.state.location
  },

  getCameraData: function() {
    return this.state.cameraData
  }
})

function loadScene(scene) {
  return scene
}

let createObject = (objectData) => {
  ViewportStore.state.scene.objects.push(objectData)
  ViewportStore.emitChange()
}

function setTime(time) {
  // sanitize
  ViewportStore.state.time = time
  ViewportStore.emitChange()
}

function setDate(date) {
  // sanitize
  ViewportStore.state.date = date
  ViewportStore.emitChange()
}

function setLocation(location) {
  // sanitize
  ViewportStore.state.location = location
  ViewportStore.emitChange()
}

function saveCameraData(cameraData) {
  ViewportStore.state.cameraData = cameraData
}



module.exports = ViewportStore