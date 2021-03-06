'use strict'

jest.dontMock('../../app/js/lib/time-services')

let TimeServices = require('../../app/js/lib/time-services')

describe('Time Services conversion functions', () => {

  it('should convert from minutes after midnight', () => {
    let noon = TimeServices.convertFromMinutesAfterMidnight(720)
    expect(noon.hour).toBe(12)
    expect(noon.minute).toBe(0)

  })

  it('should convert from days after New Year', () => {
    let summerSolstice = TimeServices.convertFromDaysAfterNewYear(171, 2015)
    expect(summerSolstice.month).toBe(5)
    expect(summerSolstice.date).toBe(21)

    /* check for leap year feb 29 2016 */
    let leapYearDay = TimeServices.convertFromDaysAfterNewYear(59, 2016)
    expect(leapYearDay.month).toBe(1)
    expect(leapYearDay.date).toBe(29)

    let newYearsDay = TimeServices.convertFromDaysAfterNewYear(0)
    expect(newYearsDay.month).toBe(0)
    expect(newYearsDay.date).toBe(1)
  })

  it('should convert from days after new year on leap year 2/29', () => {
    let leapYearDay = TimeServices.convertFromDaysAfterNewYear(59, 2016)
    expect(leapYearDay.month).toBe(1)
    expect(leapYearDay.date).toBe(29)
  })

  it('should convert from days after new year on New Years itself', () => {
    let newYearsDay = TimeServices.convertFromDaysAfterNewYear(0)
    expect(newYearsDay.month).toBe(0)
    expect(newYearsDay.date).toBe(1)
  })

  it('should return minutes since midnight when provided with a time', () => {
    let noon = {
      hour: 12,
      minute: 0
    }

    expect(TimeServices.getMinutesSinceMidnight(noon)).toBe(720)
  })

  it('should give days since New Years when provided a date', () => {
    let christmas = TimeServices.getDaysSinceNewYear({
      year: 2015,
      month: 11,
      date: 25
    })

    expect(christmas).toBe(358)
  })

  it('should return a correctly formatted string when provided a custom time object', () => {
    let formattedTimeString = TimeServices.formattedTime({
      hour: 22,
      minute: 8
    })

    expect(formattedTimeString).toBe('10:08 pm')
  })

  it('should return a correctly formatted string when provided a custom date object', () => {
    let formattedDateString = TimeServices.formattedDate({
      month: 5,
      date: 21,
      year: 2016
    })

    expect(formattedDateString).toBe('June 21, 2016')
  })
})