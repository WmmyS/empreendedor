export class DateTimeTool {

  public static getNow(): Date {
    const timeZone = 'America/Sao_Paulo';
    const saoPauloTime = new Date().toLocaleString('en-US', { timeZone });
    return new Date(saoPauloTime);
  }

  public static addSecondsToNow(seconds: number): Date {
    return DateTimeTool.addSeconds(DateTimeTool.getNow(), seconds);
  }

  public static addSeconds(date: Date, seconds: number): Date {
    const newDate = new Date(date.getTime());
    newDate.setSeconds(newDate.getSeconds() + seconds);
    return newDate;
  }

  public static addMinutes(date: Date, minutes: number): Date {
    const newDate = new Date(date.getTime());
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
  }

  public static addHours(date: Date, hours: number): Date {
    const newDate = new Date(date.getTime());
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }

  public static formatToLocalDateString(date: Date): string {
    const timeZone = 'America/Sao_Paulo';
    return date.toLocaleString('en-US', { timeZone });
  }

}