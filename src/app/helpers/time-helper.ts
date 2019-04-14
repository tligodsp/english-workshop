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
}
