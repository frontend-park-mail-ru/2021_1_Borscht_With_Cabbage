export class I18n {
    constructor () {
        this.locale = new Intl.DateTimeFormat().resolvedOptions().locale
        this.dateTime = new Intl.DateTimeFormat(this.locale,  {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        })
    }

    formatDateTime(dateTime) {
        const date = Date.parse(dateTime)
        return this.dateTime.format(date)
    }
}