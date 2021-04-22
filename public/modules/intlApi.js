export class I18n {
    constructor () {
        this.locale = new Intl.DateTimeFormat().resolvedOptions().locale
        this.dateTime = new Intl.DateTimeFormat(this.locale,  {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        })
    }

    formatDateTime(dateTime) {
        const date = Date.parse(dateTime)
        return this.dateTime.format(date)
    }

    formatInDateTimeInput(dateTime) {
        const date = new Date(Date.parse(dateTime))
        let formatted = date.toISOString()
        formatted = formatted.substring(0, formatted.indexOf("T")+6)
        return formatted
    }
}