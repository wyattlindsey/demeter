/**
 *                                        validate.js
 *
 *    This module is meant to validate function parameters as a service for APIs in the application.  It's not meant to
 *    verify user input.  Here, errors will be thrown if something doesn't validate.  The module is designed to cause
 *    my programming mistakes to crash the application.
 *
 */

'use strict'

let ValidateArguments = require('validate-arguments')

let Validate = (function() {

  return {

    hasArguments: function(args) {
      return hasArguments(args)
    },

    isNumber: function(arg) {
      return isNumber(arg)
    },

    isWithinRange: function(value, min, max) {
      return isWithinRange(value, min, max)
    },

    time: function(time) {
      return validateTime(time)
    },

    date: function(date) {
      return validateDate(date)
    },

    latitude: function(latitude) {
      return validateLatitude(latitude)
    },

    longitude: function(longitude) {
      return validateLongitude(longitude)
    }
  }

  function validateTime(time) {

    hasArguments(time.hour)
    hasArguments(time.minute)

    let args = ValidateArguments.validate(time, {

      hour: {
        isa: 'natural'
      },
      minute: {
        isa: 'natural'
      }
    })

    isWithinRange(time.hour, 0, 23)
    isWithinRange(time.minute, 0, 59)

    if (!args.isValid()) {
      throw args.errorString()
    }
  }

  function validateDate(date) {

    hasArguments(date.year)
    hasArguments(date.month)
    hasArguments(date.date)

    let args = ValidateArguments.validate(date, {

      year: {
        isa: 'natural'
      },
      month: {
        isa: 'natural'
      },
      date: {
        isa: 'natural'
      }
    })

    isWithinRange(date.year, 0, 9999)
    isWithinRange(date.month, 0, 11)
    isWithinRange(date.date, 1, 31)

    if (!args.isValid()) {
      throw args.errorString()
    }
  }

  function validateLatitude(latitude) {

    hasArguments(latitude)

    if (!isWithinRange(latitude, -90, 90)) {
      throw new Error('bad arguments')
    }
  }

  function validateLongitude(longitude) {

    hasArguments(longitude)

    isWithinRange(longitude, -180, 180)
  }

  function hasArguments(args) {
    if (typeof args !== 'undefined') {
      return true
    } else {
      throw new Error('missing arguments')
    }
  }
  
  function isNumber(arg) {
    if (!isNaN(arg)) {
      return true
    } else {
      throw new Error('argument is not a number')
    }
  }

  function isWithinRange(value, min, max) {
    if (value >= min && value <= max) {
      return true
    } else {
      throw new Error('argument out of range')
    }
  }

})()

module.exports = Validate