export class TimeHelper {
    static getTargetTime(hour: number, minute: number): Date { //in millisecond
        let t = new Date();
        t.setHours(hour);
        t.setMinutes(minute);
        t.setSeconds(0);
        t.setMilliseconds(0);
        return t;
    }

    static getCurrentTime(): Date {
        let t = new Date();
        return t;
    }

    static getTimeTillMidnight(): number { //in millisecond
        let ct = this.getCurrentTime();
        let tt = this.getTargetTime(0, 0);
        tt.setDate(tt.getDate() + 1);
        return tt.getTime() - ct.getTime();
    }

    static getDaysBetween(date1: Date, date2: Date): number {
        // The number of milliseconds in one day
        var ONE_DAY = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms);

        // Convert back to days and return
        return difference_ms/ONE_DAY;
    }
}
